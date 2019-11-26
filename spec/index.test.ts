import test from 'ava';

import OptimizelyParser from '../index';

let datafile = {
    "version": "4",
    "rollouts": [
        {
            "experiments": [
                {
                    "status": "Paused",
                    "audienceConditions": [
                        "or",
                        "16950490010"
                    ],
                    "audienceIds": [
                        "16950490010"
                    ],
                    "variations": [
                        {
                            "variables": [],
                            "id": "16965970103",
                            "key": "16965970103",
                            "featureEnabled": false
                        }
                    ],
                    "id": "16946360144",
                    "key": "16946360144",
                    "layerId": "16952310028",
                    "trafficAllocation": [
                        {
                            "entityId": "16965970103",
                            "endOfRange": 10000
                        }
                    ],
                    "forcedVariations": {}
                }
            ],
            "id": "16952310028"
        },
        {
            "experiments": [
                {
                    "status": "Not started",
                    "audienceIds": [],
                    "variations": [
                        {
                            "variables": [],
                            "id": "16961650146",
                            "key": "16961650146",
                            "featureEnabled": false
                        }
                    ],
                    "id": "16964090063",
                    "key": "16964090063",
                    "layerId": "16969790147",
                    "trafficAllocation": [
                        {
                            "entityId": "16961650146",
                            "endOfRange": 0
                        }
                    ],
                    "forcedVariations": {}
                }
            ],
            "id": "16969790147"
        },
        {
            "experiments": [
                {
                    "status": "Not started",
                    "audienceConditions": [
                        "or",
                        "16950490010"
                    ],
                    "audienceIds": [
                        "16950490010"
                    ],
                    "variations": [
                        {
                            "variables": [],
                            "id": "16966030096",
                            "key": "16966030096",
                            "featureEnabled": false
                        }
                    ],
                    "id": "16967450121",
                    "key": "16967450121",
                    "layerId": "16977320068",
                    "trafficAllocation": [
                        {
                            "entityId": "16966030096",
                            "endOfRange": 0
                        }
                    ],
                    "forcedVariations": {}
                }
            ],
            "id": "16977320068"
        },
        {
            "experiments": [
                {
                    "status": "Running",
                    "audienceConditions": [
                        "or",
                        "16969380091",
                        "16950490010"
                    ],
                    "audienceIds": [
                        "16969380091",
                        "16950490010"
                    ],
                    "variations": [
                        {
                            "variables": [],
                            "id": "17023960595",
                            "key": "17023960595",
                            "featureEnabled": true
                        }
                    ],
                    "id": "17041050430",
                    "key": "17041050430",
                    "layerId": "17012181050",
                    "trafficAllocation": [
                        {
                            "entityId": "17023960595",
                            "endOfRange": 10000
                        }
                    ],
                    "forcedVariations": {}
                }
            ],
            "id": "17012181050"
        },
        {
            "experiments": [
                {
                    "status": "Running",
                    "audienceConditions": [
                        "or",
                        "16950490010"
                    ],
                    "audienceIds": [
                        "16950490010"
                    ],
                    "variations": [
                        {
                            "variables": [],
                            "id": "16967710896",
                            "key": "16967710896",
                            "featureEnabled": true
                        }
                    ],
                    "id": "16950551402",
                    "key": "16950551402",
                    "layerId": "17013060421",
                    "trafficAllocation": [
                        {
                            "entityId": "16967710896",
                            "endOfRange": 10000
                        }
                    ],
                    "forcedVariations": {}
                }
            ],
            "id": "17013060421"
        }
    ],
    "typedAudiences": [
        {
            "id": "16950490010",
            "conditions": [
                "and",
                [
                    "or",
                    [
                        "or",
                        {
                            "value": "5cee4c6bed5e610001393482",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "5076bfcecec6e0309cd4b091",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "50f515c70145560ad40c6c11",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "5a2ff3bad55afe1b60572ed1",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "5c011940b75c3d1018c2e744",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "5c01198eb75c3d0dd4a732b5",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "5c0118efb75c3d1018c2be16",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "58a6ebecd55afe004c23d301",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "5c5c39e94c9d4404d4577e94",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "54293f90129762da6ce8620a",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "588f51f4d55afe06f0562878",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "5c8905a0d7e8e50a28dac88f",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "507856d5cec6e024603d615f",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "508703d83d7ba611f499d696",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "509d3dfbbb7a13215c8108f5",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        },
                        {
                            "value": "508c3cb13d7ba60d5c0a0919",
                            "type": "custom_attribute",
                            "name": "user_id",
                            "match": "exact"
                        }
                    ]
                ]
            ],
            "name": "Employees"
        }
    ],
    "anonymizeIP": true,
    "projectId": "16940910082",
    "variables": [],
    "featureFlags": [
        {
            "experimentIds": [],
            "rolloutId": "16952310028",
            "variables": [],
            "id": "16948630090",
            "key": "Autocomplete"
        },
        {
            "experimentIds": [],
            "rolloutId": "16977320068",
            "variables": [],
            "id": "16949970103",
            "key": "SimulateBringDowntime"
        },
        {
            "experimentIds": [],
            "rolloutId": "17013060421",
            "variables": [],
            "id": "16971330606",
            "key": "Caching"
        },
        {
            "experimentIds": [],
            "rolloutId": "16969790147",
            "variables": [],
            "id": "16983230105",
            "key": "TransactionShippingDisabled"
        }
    ],
    "experiments": [],
    "audiences": [
        {
            "id": "16950490010",
            "conditions": "[\"or\", {\"match\": \"exact\", \"name\": \"$opt_dummy_attribute\", \"type\": \"custom_attribute\", \"value\": \"$opt_dummy_value\"}]",
            "name": "Employees"
        },
        {
            "id": "16969380091",
            "conditions": "[\"and\", [\"or\", [\"or\", {\"match\": \"exact\", \"name\": \"user_id\", \"type\": \"custom_attribute\", \"value\": \"backend\"}]]]",
            "name": "Backend servers"
        },
        {
            "conditions": "[\"or\", {\"match\": \"exact\", \"name\": \"$opt_dummy_attribute\", \"type\": \"custom_attribute\", \"value\": \"$opt_dummy_value\"}]",
            "id": "$opt_dummy_audience",
            "name": "Optimizely-Generated Audience for Backwards Compatibility"
        }
    ],
    "groups": [],
    "attributes": [
        {
            "id": "16977140139",
            "key": "email"
        },
        {
            "id": "16979340052",
            "key": "user_id"
        }
    ],
    "botFiltering": false,
    "accountId": "16940910082",
    "events": [],
    "revision": "36"
};

test('test', t => {
	let parser = new OptimizelyParser(JSON.stringify(datafile));
	t.true(parser.isFeatureEnabled('Caching', 'e', {
		"user_id": "5cee4c6bed5e610001393482"
	}));
});
