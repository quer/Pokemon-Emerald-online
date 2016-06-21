var Type = require("./Type");

module.exports = new function () {
	this.Normal = new Type({"name": "Normal", "id": 1});
	this.Fire = new Type({"name": "Fire", "id": 2});
	this.Water = new Type({"name": "Water", "id": 3});
	this.Grass = new Type({"name": "Grass", "id": 4});
	this.Electric = new Type({"name": "Electric", "id": 5});
	this.Ice = new Type({"name": "Ice", "id": 6});
	this.Fighting = new Type({"name": "Fighting", "id": 7});
	this.Poison = new Type({"name": "Poison", "id": 8});
	this.Ground = new Type({"name": "Ground", "id": 9});
	this.Flying = new Type({"name": "Flying", "id": 10});
	this.Psychic = new Type({"name": "Psychic", "id": 11});
	this.Bug = new Type({"name": "Bug", "id": 12});
	this.Rock = new Type({"name": "Rock", "id": 13});
	this.Ghost = new Type({"name": "Ghost", "id": 14});
	this.Dragon = new Type({"name": "Dragon", "id": 15});
	this.load = function () {
		this.Normal.setWeaknesses([this.Ghost]);
		this.Normal.setStrengths([this.Fighting]);
		this.Fire.setWeaknesses([this.Bug, this.Fire, this.Grass]);
		this.Fire.setStrengths([this.Ground, this.Rock, this.Water]);
		this.Water.setWeaknesses([this.Water,this.Water]);
		this.Water.setStrengths([this.Grass, this.Electric]);
		this.Grass.setWeaknesses([this.Ground, this.Water, this.Grass, this.Electric]);
		this.Grass.setStrengths([this.Flying, this.Poison, this.Bug, this.Fire, this.Ice]);
		this.Electric.setWeaknesses([this.Flying, this.Electric]);
		this.Electric.setStrengths([this.Ground]);
		this.Ice.setWeaknesses([this.Ice]);
		this.Ice.setStrengths([this.Fighting, this.Rock, this.Fire]);
		this.Fighting.setWeaknesses([this.Rock, this.Bug]);
		this.Fighting.setStrengths([this.Flying, this.Psychic]);
		this.Poison.setWeaknesses([this.Fighting, this.Poison, this.Grass]);
		this.Poison.setStrengths([this.Ground, this.Bug, this.Psychic]);
		this.Ground.setWeaknesses([this.Poison, this.Rock, this.Electric]);
		this.Ground.setStrengths([this.Water, this.Grass, this.Ice]);
		this.Flying.setWeaknesses([this.Fighting, this.Bug, this.Grass, this.Ground]);
		this.Flying.setStrengths([this.Rock, this.Electric, this.Ice]);
		this.Psychic.setWeaknesses([this.Fighting, this.Psychic, this.Ghost]);
		this.Psychic.setStrengths([this.Bug]);
		this.Bug.setWeaknesses([this.Fighting, this.Ground, this.Grass]);
		this.Bug.setStrengths([this.Flying, this.Poison, this.Rock, this.Fire]);
		this.Rock.setWeaknesses([this.Normal, this.Flying, this.Poison, this.Fire]);
		this.Rock.setStrengths([this.Fighting, this.Ground, this.Water, this.Grass]);
		this.Ghost.setWeaknesses([this.Poison, this.Normal, this.Fighting]);
		this.Ghost.setStrengths([this.Ghost]);
		this.Dragon.setWeaknesses([this.Fire, this.Water, this.Grass, this.Electric]);
		this.Dragon.setStrengths([this.Ice, this.Dragon]);
		console.log("all Pokemon type loadet");
	}
}