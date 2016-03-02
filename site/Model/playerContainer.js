function playerContainer () {
	this.container = [];
	this.image = document.getElementById("characters");
	this.playerGridSize = {x: 16, y: 21};
	this.load = function (players) {
		this.container = players;
	}
	this.render = function (ctx) {
		for (var i = 0; i < this.container.length; i++) {
			ctx.drawImage(this.image, (this.playerGridSize.x * this.container[i].looking) + (this.container[i].image.x * 64), (this.playerGridSize.y * this.container[i].imageMovingIndex)+(this.container[i].image.y * 63) , this.playerGridSize.x, this.playerGridSize.y, this.container[i].x * Tile.REAL_SIZE() + World.mapOffset.x, (this.container[i].y * Tile.REAL_SIZE()- ((this.playerGridSize.y*Tile.SCALE()) - Tile.REAL_SIZE() )) + World.mapOffset.y , this.playerGridSize.x * Tile.SCALE(), this.playerGridSize.y* Tile.SCALE());
			ctx.font=(8+(2*Tile.SCALE()))+"px Georgia";
	        ctx.textAlign = "center";
	        if (!World.isUnderWorld(this.container[i].x, this.container[i].y)) {
	        	//console.log("do name");
	            ctx.fillText(this.container[i].name,this.container[i].x * Tile.REAL_SIZE() + World.mapOffset.x + ((this.playerGridSize.x * Tile.SCALE()) /2), this.container[i].y * Tile.REAL_SIZE() + World.mapOffset.y + Tile.REAL_SIZE() + (2*Tile.SCALE()));
	        };
		};
	}
}
var playerContainer = new playerContainer();