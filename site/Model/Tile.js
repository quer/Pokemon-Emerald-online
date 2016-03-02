var Tile = {
	SIZE: 16,
	REAL_SIZE: function () {
		return this.SIZE * Window.SCALE();
	},
	SCALE: function () {
		return Window.SCALE();
	}
}