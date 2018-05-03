

var ClientClass = require('./src/Client');
var port = 1313, host = '127.0.0.1';

var client = new ClientClass(port, host);

client.write('set test "value" EX 120', function (data){

    console.log('set', data+'');

    client.write('get test', function (data){
        console.log('get', data+'');
    });
});
