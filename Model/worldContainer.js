
module.exports = new function () {
	this.container = [];
	this.add = function (name, type) {
		this.container.push(new Realm(name,type));
	}
	this.remove = function (playerObj) {
		for (var i = 0; i < this.container.length; i++) {
			if(this.container[i].name == name)
				return this.container.splice(i, 1);
		}
		return false;
	}
}