function Text () {
	this.active = false;
	this.image = document.getElementById("text");
	this.textArray = [];
	this.activeIndex = 0;
	this.npc = null;
	this.arrowMovmentIndex = 0;
	this.arrowMovmentTime = new Date().getTime();
	//pre load match
	this.load = {
		"conerImage": 0,
		"repeatImage": 0,
		"repeatDown": 0,
		"repeatSideWays": 0,
		"x": 0,
		"y": 0,
		"offset": {
    		"top": 10,
    		"bottom": 10,
    		"right": 10,
    		"left": 10
    	}
	}
	this.render = function (ctx) {
		if (this.active) {
	    	//left top coner
			ctx.drawImage(this.image, 0, 0, 6, 6, this.load.x, this.load.y , this.load.conerImage, this.load.conerImage);
			//left loop
			for (var i = 0; i < this.load.repeatDown; i++) {
				//console.log("do");
				ctx.drawImage(this.image, 0, 6, 6, 1, this.load.x, this.load.y+this.load.conerImage+i , this.load.conerImage, this.load.repeatImage);
			}
			//left bottom conor
			ctx.drawImage(this.image, 0, 7, 6, 6, this.load.x, this.load.y+this.load.conerImage+this.load.repeatDown , this.load.conerImage, this.load.conerImage);	
			//bottom loop
			for (var i = 0; i < this.load.repeatSideWays; i++) {
				//console.log("do");
				ctx.drawImage(this.image, 6, 7, 1, 6, this.load.x+this.load.conerImage+i, this.load.y+this.load.conerImage+this.load.repeatDown , this.load.repeatImage, this.load.conerImage);
			}
			// top loop
			for (var i = 0; i < this.load.repeatSideWays; i++) {
				//console.log("do");
				ctx.drawImage(this.image, 6, 0, 1, 6, this.load.x+this.load.conerImage+i, this.load.y , this.load.repeatImage, this.load.conerImage);
			}
			//right top conor
			ctx.drawImage(this.image, 7, 0, 6, 6, this.load.x+this.load.conerImage+this.load.repeatSideWays, this.load.y , this.load.conerImage, this.load.conerImage);
			//right loop
			for (var i = 0; i < this.load.repeatDown; i++) {
				//console.log("do");
				ctx.drawImage(this.image, 7, 6, 6, 1, this.load.x+this.load.conerImage+this.load.repeatSideWays, this.load.y+this.load.conerImage+i , this.load.conerImage, this.load.repeatImage);
			}
			//right bottom conor
			ctx.drawImage(this.image, 7, 7, 6, 6, this.load.x+this.load.conerImage+this.load.repeatSideWays, this.load.y+this.load.conerImage+this.load.repeatDown , this.load.conerImage, this.load.conerImage);
			//center box
			ctx.fillStyle="#FFF";
			ctx.fillRect(this.load.x+this.load.conerImage,this.load.y+this.load.conerImage,this.load.repeatSideWays,this.load.repeatDown);
			//text til box
			ctx.fillStyle="#000";
			ctx.font= (10+(4*Tile.SCALE()))+"px Georgia";
			ctx.textAlign = "left";
			ctx.fillText(this.textArray[this.activeIndex],this.load.x+this.load.conerImage+(10*Window.SCALE()),this.load.y+this.load.conerImage+(10*Window.SCALE()));
			//arrow
			if (this.arrowMovmentTime+100 < new Date().getTime()) {
				if (this.arrowMovmentIndex + 1 > 6) {
					this.arrowMovmentIndex = 0;
				}else{
					this.arrowMovmentIndex++;
				}
				this.arrowMovmentTime = new Date().getTime();
			};
			if (this.activeIndex+1 != this.textArray.length) {
				ctx.drawImage(this.image, 0, 13, 7, 6, this.load.x+this.load.conerImage+this.load.repeatSideWays-(20*Window.SCALE()), this.load.y+this.load.conerImage+this.load.repeatDown-(10*Window.SCALE()) + this.arrowMovmentIndex , 7*Window.SCALE(), this.load.conerImage);
			};
		}
	}
	this.setText = function (textArray, npc) {
		if (!this.active) {
			this.textArray = textArray;
			this.active = true;
			this.activeIndex = 0;
			player.canMove = false;
			if (typeof npc != "undefined") {
				this.npc = npc;
			};
			this.load.conerImage = 6*Window.SCALE();
			this.load.repeatImage = 1*Window.SCALE();
			this.load.x = Camera.worldXOffset*Tile.REAL_SIZE()+this.load.offset.left;
			this.load.y = ((Camera.worldYOffset*Tile.REAL_SIZE()) + (Window.SCALE_HEIGHT() / 3) * 2)+this.load.offset.top;
			this.load.repeatDown =  ((Camera.worldYOffset + (Window.SCALE_HEIGHT() / Tile.REAL_SIZE()))*Tile.REAL_SIZE()) - ((this.load.conerImage * 2 ) + this.load.y + this.load.offset.bottom);
			this.load.repeatSideWays =  ((Camera.worldXOffset + (Window.SCALE_WIDTH() / Tile.REAL_SIZE()))*Tile.REAL_SIZE())  - ((this.load.conerImage * 2 ) + this.load.x + this.load.offset.right);
		};
	}
	this.doZ = function () {
		if (this.activeIndex + 1 < this.textArray.length && this.active) {
			this.activeIndex++;
			console.log("text doZ");
			return true;
		}else if(this.active){
			this.active = false;
			player.canMove = true;
			if (this.npc != null) {
				
				this.npc.endText();
				this.npc = null;
			};
			return true;
		}else {
			console.log("text no doZ");
			
			return false;
		}

	}
}
var text = new Text();