This is an Optimizely Rollouts datafile parser that doesn't rely on any third party packages - it just parses the JSON in the datafile.

# Usage
```javascript
import OptimizelyParser from '@fluffy-spoon/optimizely';

var datafile = "insert datafile JSON string here";
var parser = new OptimizelyParser(datafile);

var isCachingFeatureEnabled = parser.isFeatureEnabled("Caching", "my user id here", {
    additional_custom_attributes_go_here: "foo"
});
```

# But why?
This library is particularly useful in environments like Appcelerator's Titanium where NPM packages can't be used directly.