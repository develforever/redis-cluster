
var net = require('net');

var Utils = require('./Utils');

var fn = null;
function onData(data) {
       
    if (fn) {
        fn(data);
        fn = null;
    }
}

class Manager {

    constructor() {

        this.clients = [];
        this.keyToClient = {};

    }

    all(cmd) {
        for (var i = 0; i < this.clients.length; i += 1) {
            this.write(i, cmd);
        }
    }

    write(index, cmd, f) {

        //cmd = cmd + '\r\n';

        console.log('redis cmd [' + index + ']: ' + Utils.escape(cmd));

        fn = f;

        this.clients[index].removeListener('data', onData);
        this.clients[index].on('data', onData);

        this.clients[index].write(cmd);
    }

    addServer(host, port) {

        var client = new net.Socket();
        client.connect(port, host, function () {
            console.log('redis cluster client connected', host + ":" + port);
        });

        this.clients.push(client);

    }

}


module.exports = Manager;