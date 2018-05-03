var net = require('net');


class Client {

    constructor(port, host) {

        this.client = new net.Socket({});
        this.client.connect(port, host, function () {
            console.log('Connected', host + ":" + port);
        });
    }

    write(cmd, fn){

        var clk = this.client;

        this.client.on('data', function (data) {
            clk.on('data', function(){});
            fn(data);
        });

        this.client.write(cmd+'\r\n');
    }

}


module.exports = Client;
