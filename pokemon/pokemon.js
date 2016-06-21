function (data, type, weaknesses) {
	this.name = data.name;
	this.hp = data.hp;
	this.attack = data.attack;
	this.defense = data.defense;
	this.sp = {
		atk: data["sp.atk"],
		def: data["sp.def"]
	}
	this.speed = data.speed;
	this.level = data.level;
	this.type = type;
	this.weaknesses = weaknesses;
}