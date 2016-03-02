var database = require("./Database/database");
//the maps.. auto load all js files in map
var normalizedPath = require("path").join(__dirname, "map");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./map/" + file);
});
//the map container
var MapContainer =  require("./Model/mapContainer");
//make all maps.
for (var key in TileMaps) {
	MapContainer.add(TileMaps[key]);
};


var RealmContainer = require("./Model/realmContainer");

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = 3000;
var fps = 1000 / 30 ;
var delta = 0;
var gameLoop = null;
console.log("starter server on port "+port);
server.listen(port);
app.use("/site/", express.static(__dirname + '/site/'));
app.use("/map/", express.static(__dirname + '/map/'));
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/site/index.html');
});
var PlayerContainer = require("./Model/playerContainer");
//preload realms
database.query("SELECT * FROM realm", function(realms){
	for (var i = 0; i < realms.length; i++) {
		console.log("=========|Load Realm|=========");
		RealmContainer.add(realms[i].name,realms[i].type, realms[i].id);
	};
	startGame();
});
// done load servers
io.sockets.on('connection', function (socket) {
	console.log("New connection");
	
	socket.emit('realms', RealmContainer.getNames());

	socket.on('ping', function() {
	    socket.emit('pong');
	});

	socket.on('login', function(name, realmId, callback) {
		console.log("login: "+name + " realmId: "+ realmId);
		database.query("SELECT t1.*, t2.x AS cX, t2.y AS cY FROM `player` AS `t1`, `characters` AS `t2` WHERE t1.characters = t2.id AND name = \""+name+"\" AND realm = \""+realmId+"\"", function(player){
			if (player.length <= 0) {
				callback(false);
			}else{
				//console.log(player[0]);
				socket.ownSocket = socket;
				var newPlayer = RealmContainer.newPlayer(player[0], socket.ownSocket);
				if (newPlayer != null) {
					socket.player = newPlayer;
					callback("login and game will start soon");
					updateWorld(newPlayer);
				}else{
					callback("user world mest up");
				}
			}
		});    
	});
	socket.on('disconnect', function(){
    	if(!socket.player) return;
    	var toUpdateWorld = {"realm": socket.player.realm, "world": socket.player.world}
		if (PlayerContainer.remove(socket.player, RealmContainer)) {
			updateWorld(toUpdateWorld);
		};
	});
	socket.on('doKey', function(key){
		//console.log(key);
		if(key == "down"){
			socket.player.move.down = true;	
		}else if(key == "up"){
			socket.player.move.up = true;	
		}else if(key == "left"){
			socket.player.move.left = true;	
		}else if(key == "right"){
			socket.player.move.right = true;	
		}else if(key == "z"){
			socket.player.move.z = true;	
		}else if(key == "x"){
			socket.player.move.x = true;	
		}
	});
	socket.on('endKey', function(key){
		//console.log(key);
		if(key == "down"){
			socket.player.move.down = false;	
		}else if(key == "up"){
			socket.player.move.up = false;	
		}else if(key == "left"){
			socket.player.move.left = false;	
		}else if(key == "right"){
			socket.player.move.right = false;	
		}else if(key == "z"){
			socket.player.move.z = false;
		}else if(key == "x"){
			socket.player.move.x = false;	
		}
	});
});
function updateWorld (playerObj) {
	var data = PlayerContainer.buildPlayerToClient(playerObj, RealmContainer);
	//console.log(data.users);
	for (var i = 0; i < data.users.length; i++) {
		console.log("update: "+data.users[i].world);
		data.users[i].ownSocket.emit('gameUpdate', {"users" : data.buildUsers, "camera": {"x": data.users[i].x, "y": data.users[i].y}, "world": data.users[i].world});
	};
}
function movePlayer (delta) {
	if (delta % 5 === 0) {
		for (var i = 0; i < PlayerContainer.container.length; i++) {
			var playerObj = PlayerContainer.container[i];
		    if (playerObj.move.left == true || playerObj.move.right == true || playerObj.move.up == true || playerObj.move.down == true) {
		    	if(playerObj.movePlayer(RealmContainer)){
		    		//console.log("frame : "+ delta + " player World : " + playerObj.world);
					updateWorld(playerObj);
				}
		    }else if (playerObj.move.z == true) {
		    	if(playerObj.doZ()){

		    	}
		    	playerObj.move.z = false;
		    }else if (playerObj.move.x == true) {
		    	playerObj.move.x = false;
		    };
		}
	}
}
function startGame () {
    if (gameLoop == null) {
        gameLoop = setInterval(mainloop, fps);
        console.log("game start");
    };
}
var mainloop = function() {
	delta++;
	movePlayer(delta);
};
function stopGame () {
	   	console.log("stopGame");
	clearInterval(gameLoop);
	gameLoop = null;
}