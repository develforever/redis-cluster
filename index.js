
// global
var net = require('net');
// custom
var ManagerClass = require('./src/Manager');

// instances
var manager = new ManagerClass();

manager.addServer("192.168.33.10", 6379);
manager.addServer("192.168.33.10", 6380);

// info
console.log('Redis cluster 1.0.0',);

// listen for clients
var server = net.createServer(function(socket) {
	socket.write('Echo server\n');
	socket.pipe(socket);
});

server.listen(1313, '127.0.0.1');
console.log("Server running at 127.0.0.1:1313\n");
