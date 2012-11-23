# Graphite Heartbeat Example for Node.js

Example to send heartbeat data to Wercker. This is used to check if a [deploy was successful](deployment#post-deploy-metrics-test).


``` javascript
var graphite = require('graphite');
var client = graphite.createClient(process.env.WERCKER_METRICS_URL);

function reportHeartBeat(){
    var metrics = {};
    metrics[process.env.WERCKER_METRICS_KEY + "." + os.hostname()  + ".heartbeat"] =  1;
    client.write(metrics, function(err) {
        setTimeout(function(){reportHeartBeat();},5000)
    });
}

reportHeartBeat();
```
