var World = require("./world");
var MapContainer =  require("./mapContainer");
module.exports = function (name, type, id) {
	console.log("build: "+name +" type: "+ type);
	this.name = name;
	this.type = type;
	this.id = id;
	this.world = [];
	console.log("mapContainer:"+MapContainer.container.length);
	for (var i = 0; i < MapContainer.container.length; i++) {
		this.world.push(new World(MapContainer.container[i]));
	}
	this.find = function (name){
		for (var i = 0; i < this.world.length; i++) {
			if(this.world[i].name == name)
			{
				return this.world[i];
			}
		};
		return null;
	}
	this.teleport = function (playerObj, map){
		//console.log("oldWorld."+ oldWorld);
		var oldWorld = this.find(map);
		oldWorld.removePlayer(playerObj);
		//console.log(oldWorld.playerContainer);
		var newWorld = this.find(playerObj.world);
		newWorld.addPlayer(playerObj);
		//console.log(newWorld.playerContainer);
	}
}