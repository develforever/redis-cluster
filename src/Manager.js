
var net = require('net');


class Manager {

    constructor(){

        this.clients = [];
        this.keyToClient = {};

    }

    addServer(host, port){

        var client = new net.Socket();
        client.connect(port, host, function() {
            console.log('Connected', host+":"+port);
            client.write('Hello, server! Love, Client.');
        });

        client.on('data', function(data) {
            console.log('Received: ' + data);
            client.destroy();
        });

        client.on('close', function() {
            console.log('Connection closed', arguments);
        });
        client.on('error', function() {
            console.log('Connection error', arguments);
        });

        this.clients.push(client);

    }

}


module.exports = Manager;