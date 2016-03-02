
module.exports = {
	container: [],
	add: function (data) {
		this.container.push(data);
	},
	find: function (name) {
		for (var i = 0; i < this.container.length; i++) {
			if(this.container[i].layers[0].name == name)
				return this.container[i];
		};
		return null;
	}
}