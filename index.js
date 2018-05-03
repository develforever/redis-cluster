
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

var map = {};
var mapDb = {};
var counter = 0;



// listen for clients
var server = net.createServer({
	allowHalfOpen :true
}, function (socket) {

	var selectDb = 0;
	socket.on('data', function (data) {
		console.log('command: ' + Utils.escape(data));

		var splited = (data+'').split(" ");
		var cmd = splited[0];
		var key = splited[1];

		var hash = key;

		//if (!(hash in map)) {

			map[hash] = new Number(counter % manager.clients.length);
			mapDb[hash] = selectDb;
			counter += 1;
		//}

		manager.write(map[hash], data, function (data) {

			socket.write( data );
			console.log('proxy: ' + Utils.escape(data+''));
			
		});

	});

	socket.on('end', function(){
		console.log('client end');
		socket.destroy();
	});

	//socket.pipe(socket);


});

server.listen(1313, '127.0.0.1');
console.log("Server running at 127.0.0.1:1313\n");
