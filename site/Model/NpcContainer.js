function npcContainer () {
	this.container = [];
	this.image = document.getElementById("characters");
	this.npcGridSize = {x: 16, y: 21};
	this.load = function (npcs) {
		this.container = npcs;
	}
	this.render = function (ctx) {
		for (var i = 0; i < this.container.length; i++) {
			ctx.drawImage(this.image, (this.npcGridSize.x * this.container[i].looking) + (this.container[i].imagePoss.x * 64), (this.npcGridSize.y * this.container[i].imageMovingIndex)+(this.container[i].imagePoss.y * 63) , this.npcGridSize.x, this.npcGridSize.y, this.container[i].x * Tile.REAL_SIZE() + World.mapOffset.x, (this.container[i].y * Tile.REAL_SIZE()- ((this.npcGridSize.y*Tile.SCALE()) - Tile.REAL_SIZE() )) + World.mapOffset.y , this.npcGridSize.x * Tile.SCALE(), this.npcGridSize.y* Tile.SCALE());
			ctx.font=(8+(2*Tile.SCALE()))+"px Georgia";
	        ctx.textAlign = "center";
	        if (!World.isUnderWorld(this.container[i].x, this.container[i].y)) {
	        	//console.log("do name");
	            ctx.fillText(this.container[i].name,this.container[i].x * Tile.REAL_SIZE() + World.mapOffset.x + ((this.npcGridSize.x * Tile.SCALE()) /2), this.container[i].y * Tile.REAL_SIZE() + World.mapOffset.y + Tile.REAL_SIZE() + (2*Tile.SCALE()));
	        };
		};
	}
}
var npcContainer = new npcContainer();