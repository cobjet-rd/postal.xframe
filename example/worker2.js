(function(global, undefined) {
    self.console = {
        log: function(msg) {
            postMessage("WORKER2: " + JSON.stringify(msg, null, 2));
        }
    };
    importScripts("../bower/lodash/dist/lodash.js", "../bower/riveter/lib/riveter.js", "../bower/postal.js/lib/postal.js", "../bower/postal.federation/lib/postal.federation.js", "../lib/postal.xframe.js");
    postal.instanceId("worker2");
    postal.fedx.addFilter([{
        channel: "webworker2",
        topic: "#",
        direction: "in"
    }, {
        channel: "webworker",
        topic: "#",
        direction: "out"
    }]);
    postal.subscribe({
        channel: "webworker2",
        topic: "hit.me.baby.one.more.time",
        callback: function(d, e) {
            postal.publish({
                channel: "webworker",
                topic: "How.About.Them.Apples",
                data: "Hai, I am Worker 2."
            });
        }
    });
    postal.fedx.signalReady();
}(this));
