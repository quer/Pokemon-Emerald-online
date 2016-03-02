module.exports = function (data) {
	this.name = data.name;
	this.movment = {
		"type": data.movment_type,
		"radius": data.movment_radius,
		"start": {
			"x": data.movment_start_x,
			"y": data.movment_start_y,
			"looking": data.movment_start_looking
		}
	};
	this.map = data.map;
	this.text = data.text;
	this.x = this.movment.start.x;
	this.y = this.movment.start.y;
	this.lastMoved = new Date().getTime();
	this.imageMovingIndex = 0;
	this.looking = this.movment.start.looking;
	this.canMove = true;
	this.imagePoss = {
		"x":data.image_x,
		"y":data.image_y
	}
}