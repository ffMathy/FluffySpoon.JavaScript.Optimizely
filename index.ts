import * as murmurhash from 'murmurhash';

export interface Variation {
    variables: any[];
    id: string;
    key: string;
    featureEnabled: boolean;
}

export interface TrafficAllocation {
    entityId: string;
    endOfRange: number;
}

export interface ForcedVariations {
}

export interface Experiment {
    status: string;
    audienceConditions: [ConditionType, ...string[]];
    audienceIds: string[];
    variations: Variation[];
    id: string;
    key: string;
    layerId: string;
    trafficAllocation: TrafficAllocation[];
    forcedVariations: ForcedVariations;
}

export interface Rollout {
    experiments: Experiment[];
    id: string;
}

export interface FeatureFlag {
    experimentIds: any[];
    rolloutId: string;
    variables: any[];
    id: string;
    key: string;
}

export interface TypedAudience {
    id: string;
    conditions: ConditionTreeRoot;
    name: string;
}

export interface Audience {
    id: string;
    conditions: string;
    name: string;
}

export interface Attribute {
    id: string;
    key: string;
}

export interface Data {
    version: string;
    rollouts: Rollout[];
    typedAudiences: TypedAudience[];
    anonymizeIP: boolean;
    projectId: string;
    variables: any[];
    featureFlags: FeatureFlag[];
    experiments: any[];
    audiences: Audience[];
    groups: any[];
    attributes: Attribute[];
    botFiltering: boolean;
    accountId: string;
    events: any[];
    revision: string;
}

export type ConditionType = 'or' | 'and' | 'not';

export type ConditionTreeConditionArgument = {
    match: 'exact' | 'substring',
    name: string;
    type: 'custom_attribute';
    value: string;
};

export type ConditionTreeCondition = ConditionTreeRoot | ConditionTreeConditionArgument;

export type ConditionTreeRoot = [ConditionType, ...ConditionTreeCondition[]]

export default class OptimizelyParser {
    private readonly parsedData: Data;

    constructor(datafile: string) {
        this.parsedData = JSON.parse(datafile);
    }

    doesFeatureExist(key: string) {
        return !!this.findFeatureByKey(key);
    }

    private findFeatureByKey(key: string) {
        return this.parsedData.featureFlags.find(x => x.key === key);
    }

    isFeatureEnabled(key: string, userId: string, customAttributes: any) {
        let feature = this.findFeatureByKey(key);
        if(!feature)
            return null;

        let rollout = this.parsedData
            .rollouts
            .find(x => x.id == feature.rolloutId);
        if(!rollout)
            return null;

        let experiments = rollout
            .experiments
            .filter(x => x.layerId === rollout.id);
        if(experiments.length === 0)
            return false;

        let experiment = experiments[0];
        if(experiment.status !== "Running")
            return false;

        let hasAudienceMatch = this.getHasAudienceCollectionMatch(experiment.audienceConditions, customAttributes);
        if(!hasAudienceMatch)
            return false;

        let variationsAndTrafficAllocations = experiment
            .variations
            .filter(x => x.featureEnabled)
            .map(x => ({
                variation: x,
                trafficAllocation: experiment
                    .trafficAllocation
                    .find(y => y.entityId === x.key)
            }));

        let bucket = this.getBucket(userId);
        let isInCorrectBucket = !!variationsAndTrafficAllocations.find(x => x.trafficAllocation.endOfRange >= bucket);
        return isInCorrectBucket;
    }

    private getHasAudienceCollectionMatch(
        audienceConditions: [ConditionType, ...string[]], 
        customAttributes: any) 
    {
        let [ conditionType, ...audienceIds ] = audienceConditions;
        let audienceMatches = this.parsedData.typedAudiences
            .filter(
                x => audienceIds.find(
                    y => y === x.id))
            .map(x => this.getHasAudienceMatch(x, customAttributes));

        let evaluator = this.getBooleanEvaluator(conditionType);
        return evaluator(...audienceMatches);
    }

    private getBooleanEvaluator(conditionType: ConditionType): (...args: boolean[]) => boolean {
        switch(conditionType) {
            case 'or':
                return this.booleanOr.bind(this);
                
            case 'and':
                return this.booleanAnd.bind(this);
                
            case 'not':
                return this.booleanNot.bind(this);
        }
    }

    private getHasAudienceMatch(audience: TypedAudience, customAttributes: any) {
        let getHasConditionTreeArgumentMatch = (argument: ConditionTreeConditionArgument) => {
            let value = argument.value;

            //we only support custom attributes for now.
            if(argument.type !== "custom_attribute") {
                console.warn('Couldn\'t handle argument of type ' + argument.type);
                return false;
            }

            let matchFunctions: { [key: string]: (x: string) => boolean } = {
                exact: x => x === value,
                substring: x => !!x && x.indexOf(value) > -1
            };

            let matchFunction = matchFunctions[argument.match];
            if(!matchFunction) {
                console.warn('Couldn\'t handle match function of type ' + argument.match);
                return false;
            }
            
            return matchFunction(customAttributes[argument.name]);
        };

        let getHasConditionTreeRootMatch = (root: ConditionTreeRoot): boolean => {
            let [ conditionType, ...values ] = root;

            let matches = values.map(x => Array.isArray(x) ?
                getHasConditionTreeRootMatch(x) :
                getHasConditionTreeArgumentMatch(x));

            let evaluator = this.getBooleanEvaluator(conditionType);
            return evaluator(...matches);
        };

        return getHasConditionTreeRootMatch(audience.conditions);
    }

    private getBucket(bucketingKey) {
        const MAX_HASH_VALUE = Math.pow(2, 32);
        const MAX_TRAFFIC_VALUE = 10000;
    
        var hashValue = murmurhash.v3(bucketingKey, 1);
        var ratio = hashValue / MAX_HASH_VALUE;
        return ratio * MAX_TRAFFIC_VALUE;
    }

    private booleanOr(...values: boolean[]) {
        for(let value of values) {
            if(value)
                return true;
        }

        return false;
    }

    private booleanAnd(...values: boolean[]) {
        for(let value of values) {
            if(!value)
                return false;
        }

        return true;
    }

    private booleanNot(...values: boolean[]) {
        if(values.length !== 1)
            throw new Error('A "not" condition can\'t contain more than one argument.');

        return !values[0];
    }
}