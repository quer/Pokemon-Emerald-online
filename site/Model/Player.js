function Player () {
	this.name = "test"; 
	this.x = 22;//133//22;
	this.y = 22;//173//22;
    this.mapName = "fullMap";
	this.warking = true;
	this.runing = false;
	this.looking = "down";
	this.canMove = true;
	this.move = {
        up: false,
        down: false,
        right: false,
        left: false
    }
    this.imageMovingIndex = 0;
    this.timeLastMoving = new Date().getTime();
    this.image = document.getElementById("player");
    this.update = function (delta) {
    	if (this.warking && (delta % 3) === 0) {
			this.movePlayer();
		}else if (this.runing && (delta % 1) === 0) {
			this.movePlayer();
		};
		this.x = Camera.heroXOffset;
		this.y = Camera.heroYOffset;
    }
    this.render = function (ctx) {
    	var lookingIndex = 1;
    	if (this.looking == "down") {
    		lookingIndex = 0;
    	}else if (this.looking == "left") {
    		lookingIndex = 2;
    	}else if (this.looking == "right") {
    		lookingIndex = 3;
    	}
    	var playerGridSize = {x: 15, y: 22};
    	if (this.timeLastMoving+1500 < new Date().getTime()) {
			this.imageMovingIndex = 0;
    	};
		ctx.drawImage(this.image, playerGridSize.x * lookingIndex, playerGridSize.y * this.imageMovingIndex, playerGridSize.x, playerGridSize.y, this.x * Tile.REAL_SIZE() + World.mapOffset.x, (this.y * Tile.REAL_SIZE()- ((playerGridSize.y*Tile.SCALE()) - Tile.REAL_SIZE() )) + World.mapOffset.y , playerGridSize.x * Tile.SCALE(), playerGridSize.y* Tile.SCALE());
		ctx.font=(8+(2*Tile.SCALE()))+"px Georgia";
        ctx.textAlign = "center";
        if (!World.isUnderWorld(this.x, this.y)) {
            ctx.fillText(this.name,this.x * Tile.REAL_SIZE() + World.mapOffset.x + ((playerGridSize.x * Tile.SCALE()) /2), this.y * Tile.REAL_SIZE() + World.mapOffset.y + Tile.REAL_SIZE() + (2*Tile.SCALE()));
        };
        /*ctx.rect(this.x*Tile.SIZE, this.y*Tile.SIZE, 16, 16);
      	ctx.lineWidth = 1;
      	ctx.stroke();*/
    }
    this.movePlayer = function () {
    	if (this.move.up && this.canMove) {
    		if (this.looking == "up" && this.testUp()) {
				Camera.update(0, -1);
				this.moveImage(false);
			}else{
				this.looking = "up";
				this.moveImage(true);
			}
	    }else if (this.move.down && this.canMove) {
			if (this.looking == "down" && this.testDown()) {	
				Camera.update(0, 1);
				this.moveImage(false);
			}else{
				this.looking = "down";
				this.moveImage(true);
			}
	    }else if (this.move.right && this.canMove) {
			if (this.looking == "right" && this.testRight()) {
				Camera.update(1, 0);
				this.moveImage(false);
			}else{
				this.looking = "right";
				this.moveImage(true);
			}
	    }else if (this.move.left && this.canMove) {
			if (this.looking == "left" && this.testLeft()) {
	    	    Camera.update(-1, 0);
	    	    this.moveImage(false);
	        }else{
				this.looking = "left";
				this.moveImage(true);
			}
	    }
	    this.eventOnBlock(this.x,this.y);
    }
    this.doZ = function () {
    	var returnData = false;
    	if (this.looking == "down") {
    		returnData = this.eventLooking(this.x, this.y+1);
    	}else if (this.looking == "left") {
    		returnData = this.eventLooking(this.x-1, this.y);
    	}else if (this.looking == "right") {
    		returnData = this.eventLooking(this.x+1, this.y);
    	}else{
    		returnData = this.eventLooking(this.x, this.y-1);
    	}
    	console.log(returnData);
    	if (returnData != false && returnData.type == "sign") {
    		text.setText(returnData.data);
    		return true;
    	}else{
    		return false;
    	}
    }
    this.doX = function () {
    }
    this.eventOnBlock = function (x, y) {
    	var tileData = this.eventLooking(x, y);
    	if (tileData != false && tileData.type == "warp") {
    		var moveX = tileData.data.x - this.x; 
    		var moveY = tileData.data.y - this.y;
    		Camera.update(moveX, moveY);
    		console.log("do eventOnBlock warp");
    	}else if (tileData != false && tileData.type == "teleport") {
            console.log("do eventOnBlock tele");
            var map = tileData.data;
            console.log(tileData);
            World.load(map.map);
            if(map.poss == null){
                var mapData = Rooms.find(map.map);
                this.x = mapData.start.x;
                this.y = mapData.start.y;
            }else{
                this.x = map.poss.x;
                this.y = map.poss.y;
            }
            Camera.heroXOffset = this.x;
            Camera.heroYOffset = this.y;
            Camera.load();
        };
    }
    this.moveImage = function (stop) {
    	if (!stop) {
	    	this.imageMovingIndex++;
	    	if (this.imageMovingIndex > 5) {
	    		this.imageMovingIndex = 1;
	    	};
	    	this.timeLastMoving = new Date().getTime();
    	}else{
    		this.imageMovingIndex = 0;
    	}
    }
    this.testUp = function () {
    	//console.log(World.eventReturn(this.x, this.y-1)+" up");
    	return Collision.canWark(this.x, this.y-1);
    }
    this.testDown = function () {
    	return Collision.canWark(this.x, this.y+1);
    }
    this.testLeft = function () {
    	return Collision.canWark(this.x-1, this.y);
    }
    this.testRight = function () {
    	return Collision.canWark(this.x+1, this.y);
    }
    this.eventLooking = function(x, y) {
    	//console.log("looking" + x + " " + y);
        var isNpc = NpcContainer.isNpc(x, y);
    	if (typeof World.map.events.sign[x+"_"+y] != "undefined") {
    		return {"type" : "sign", "data": World.map.events.sign[x+"_"+y] };
    	}else if (typeof World.map.events.warp[x+"_"+y] != "undefined") {
    		return {"type" : "warp", "data": World.map.events.warp[x+"_"+y] };
    	}else if (typeof World.map.events.teleport[x+"_"+y] != "undefined") {
            return {"type" : "teleport", "data": World.map.events.teleport[x+"_"+y] };
        }else if (isNpc != null) {
            isNpc.activeNpc();
        };
    	return false;
    }
}

var player = new Player();

//x : 133,
//y : 173