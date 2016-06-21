var Realm = require("./realm");
var Player = require("./player");
var PlayerContainer = require("./playerContainer");

module.exports = new function () {
	this.container = [];
	this.add = function (name, type, id) {
		this.container.push(new Realm(name,type, id));
	};
	this.remove = function (playerObj) {
		for (var i = 0; i < this.container.length; i++) {
			if(this.container[i].name == name)
				return this.container.splice(i, 1);
		}
		return false;
	};
	this.find = function(id){
		for (var i = 0; i < this.container.length; i++) {
			if(this.container[i].id == id)
				return this.container[i];
		};
		return null;
	};
	this.getNames = function (){
		var returnArray = [];
		for (var i = 0; i < this.container.length; i++) {
			returnArray.push({"name": this.container[i].name, "type": this.container[i].type, "id": this.container[i].id});
		};
		return returnArray;
	};
	this.newPlayer = function(playerData, ownSocket){
		var realm = this.find(playerData.realm);
		if (realm != null) {
			var world = realm.find(playerData.world);
			if (world != null) {
				var newPlayer = new Player(playerData, ownSocket);
				PlayerContainer.add(newPlayer);
				world.addPlayer(newPlayer);
				return newPlayer;
			}else{
				return null;
			}
		}else{
			return null;
		}
	}
}
