var NpcContainer = require("./npcContainer");
var npc = require("./npc");
//var db = require("./../Database/database");

module.exports = function (data) {
	console.log("build: " + data.layers[0].name);
	this.data = [];
	//loading world/map
	this.height = data.height;
	this.width = data.width;
	this.tilesets = data.tilesets;
	this.events = data.events;
	this.name = data.layers[0].name;
	this.start = data.start;
	this.playerContainer = [];
	this.npcContainer = [];
	this.index = data.layers.length -1;
	var layer = data.layers[this.index];
	var firstgid = layer.firstgid;
	var endArray = new Array(data.width);
	for (var a = 0; a < endArray.length; a++) {
		endArray[a] = new Array(data.height);
	}
	var index = 0;
	for (var ii = 0; ii < data.height; ii++) {
		for (var iii = 0; iii < data.width; iii++) {
			//console.log(iii + " "+ ii);
			endArray[iii][ii] = (layer.data[index] - firstgid);
			index++;
		};
	};
	this.data = endArray;
	/*var that = this;
	db.query("SELECT * FROM npc WHERE map = \""+this.name+"\"", function(npcs){
		console.log("start load npc");
		for (var i = 0; i < npcs.length; i++) {
			var newNpc = new npc(npcs[i]);
			NpcContainer.add(newNpc);
			that.npcContainer.push(newNpc);
		};
		console.log("npc loaded!");
	});*/
	
	this.addPlayer = function (playerObj) {
		this.playerContainer.push(playerObj);
	}
	this.removePlayer = function (playerObj) {
		for (var i = 0; i < this.playerContainer.length; i++) {
			if(this.playerContainer[i].name == playerObj.name)
				return this.playerContainer.splice(i, 1);
		}
		return false;
	}
	this.eventReturn = function (x, y) {
		return this.data[x][y];
	}
}