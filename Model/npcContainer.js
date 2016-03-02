module.exports = {
	container: [],
	add: function (npc){
		this.container.push(npc);
	},
	update: function (delta) {
		for (var i = 0; i < this.container.length; i++) {
			this.container[i].update(delta);
		};
	}
}