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
	this.findTile = function (world) {
		var moveWay = Math.floor(Math.random() * 3) + 0;
		if (moveWay == 0) {
			if(!this.test(this.x, this.y+1, world)){
				return this.findTile(world);
			}else{
				this.y++;
			}
		}else if (moveWay == 1) {
			if(!this.test(this.x, this.y-1, world)){
				return this.findTile(world);
			}else{
				this.y--;
			}
		}else if (moveWay == 2) {
			if(!this.test(this.x-1, this.y, world)){
				return this.findTile(world);
			}else{
				this.x--;
			}
		}else if (moveWay == 3) {
			if(!this.test(this.x+1, this.y, world)){
				return this.findTile(world);
			}else{
				this.x++;
			}
		}
		if (this.looking == moveWay) {
			if (this.imageMovingIndex + 1 > 2) {
				this.imageMovingIndex = 1	
			}else{
				this.imageMovingIndex++;
			}
		}else{
			this.imageMovingIndex = 1;
		}
		this.looking = moveWay;
		return true;
	}
	this.test = function (x, y, world) {
		if(this.canWark(x, y, world) && 
			x <=  this.movment.start.x + this.movment.radius && 
			x >=  this.movment.start.x - this.movment.radius && 
			y <=  this.movment.start.y + this.movment.radius && 
			y >=  this.movment.start.y - this.movment.radius ){
				return true;
		}else{
			return false;
		}
	}
	this.canWark = function(x, y, world) {
    			
		var eventNr = world.eventReturn(x, y);
    	if (eventNr != 0 && eventNr != 2 && eventNr != 5 && eventNr != 3) {
    		return false;
    	}
    	return true;
		    
    }	
}