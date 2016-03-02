function Rooms () {
	this.container = [];
	this.load = function () {
		for (var key in TileMaps) {
			this.container.push(new Map(TileMaps[key]));
		};
	}
	this.find = function (name) {
		for (var i = 0; i < this.container.length; i++) {
			if(this.container[i].name == name)
				return this.container[i];
		};
		console.log("no world whit that name");
		return null;
	}
}
var Rooms = new Rooms();
