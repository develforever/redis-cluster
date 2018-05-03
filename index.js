
// global
var net = require('net');
var md5 = require('md5');

// custom
var ManagerClass = require('./src/Manager');
var Utils = require('./src/Utils');

// instances
var manager = new ManagerClass();

manager.addServer("192.168.33.10", 6379);
manager.addServer("192.168.33.10", 6380);

// info
console.log('Redis cluster 1.0.0', );

var counter = 0;

// listen for clients
var server = net.createServer({
	allowHalfOpen :true
}, function (socket) {

	
	socket.pipe(manager.clients[counter%manager.clients.length]).pipe(socket);
	counter+=1;
});

server.listen(1313, '127.0.0.1');
console.log("Server running at 127.0.0.1:1313\n");
