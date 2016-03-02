var MapContainer = require("./mapContainer");
module.exports = function (data, ownSocket) {
	this.name = data.name; 
	this.x = data.x;//133//22;
	this.y = data.y;//173//22;
    this.world = data.world;
    this.realm = data.realm;
	this.warking = true;
	this.runing = false;
	this.looking = 0;
	this.canMove = true;
	this.ownSocket = ownSocket;
	this.image = {
		"x": data.cX,
		"y": data.cY
	}
	this.move = {
        up: false,
        down: false,
        right: false,
        left: false
    }
    this.imageMovingIndex = 0;
    this.timeLastMoving = new Date().getTime();
    this.build = function () {
    	return {
    		"name" : this.name, 
			"x" : this.x,
			"y" : this.y,
			"looking" : this.looking,
			"imageMovingIndex": this.imageMovingIndex,
			"image" : this.image
    	}
    }
    this.movePlayer = function (RealmContainer) {
    	if (this.move.up && this.canMove) {
    		if (this.looking == 1 && this.testUp(RealmContainer)) {
    			this.doMove(0, -1);
				this.moveImage(false);
			}else{
				this.looking = 1;
				this.moveImage(true);
			}
	    }else if (this.move.down && this.canMove) {
			if (this.looking == 0 && this.testDown(RealmContainer)) {
				this.doMove(0, 1);
				this.moveImage(false);
			}else{
				this.looking = 0;
				this.moveImage(true);
			}
	    }else if (this.move.right && this.canMove) {
			if (this.looking == 3 && this.testRight(RealmContainer)) {
				this.doMove(1, 0);
				this.moveImage(false);
			}else{
				this.looking = 3;
				this.moveImage(true);
			}
	    }else if (this.move.left && this.canMove) {
			if (this.looking == 2 && this.testLeft(RealmContainer)) {
				this.doMove(-1, 0);
	    	    this.moveImage(false);
	        }else{
				this.looking = 2;
				this.moveImage(true);
			}
	    }else{
	    	return false;
	    }
	    return this.eventOnBlock(this.x,this.y, RealmContainer);
	    
    }
    this.testUp = function (RealmContainer) {
    	return this.canWark(this.x, this.y-1, RealmContainer);
    }
    this.testDown = function (RealmContainer) {
    	return this.canWark(this.x, this.y+1, RealmContainer);
    }
    this.testLeft = function (RealmContainer) {
    	return this.canWark(this.x-1, this.y, RealmContainer);
    }
    this.testRight = function (RealmContainer) {
    	return this.canWark(this.x+1, this.y, RealmContainer);
    }
    this.canWark = function(x, y, RealmContainer) {
    	//console.log(RealmContainer);
    	var realm = RealmContainer.find(this.realm);
		if (realm != null) {
			var world = realm.find(this.world);
			if (world != null) {
				
				var eventNr = world.eventReturn(x, y);
		    	if (eventNr != 0 && eventNr != 2 && eventNr != 5 && eventNr != 3) {
		    		return false;
		    	}
		    	//if player collision
		    	/*for (var i = 0; i < world.playerContainer.length; i++) {
		    		if(world.playerContainer[i].x == x && world.playerContainer[i].y == y)
		    			return false;
		    	};*/
		    	return true;
		    }
    	}
    	return false;
    }
    this.doMove = function (x, y) {
    	//console.log("movePlayer x:"+ this.x +" y:" + this.y);
    	this.x += x;
    	this.y += y;
    	//console.log("movePlayer x:"+ this.x +" y:" + this.y);
    }
    this.moveImage = function (stop) {
    	if (!stop) {
	    	this.imageMovingIndex++;
	    	if (this.imageMovingIndex > 2) {
	    		this.imageMovingIndex = 1;
	    	};
	    	this.timeLastMoving = new Date().getTime();
    	}else{
    		this.imageMovingIndex = 0;
    	}
    }
    this.eventOnBlock = function (x, y,RealmContainer) {
    	var tileData = this.eventLooking(x, y);
    	console.log(tileData);
    	if (tileData != false && tileData.type == "warp") {
    		this.x = tileData.data.x; 
    		this.y = tileData.data.y;
    		console.log("do eventOnBlock warp");
    	}else if (tileData != false && tileData.type == "teleport") {
            console.log("do eventOnBlock tele");
            var map = tileData.data;
            console.log(tileData);
            var oldWorld = this.world;
            this.world = map.map;
            if(map.poss == null){
                var mapData = MapContainer.find(map.map);
                this.x = mapData.start.x;
                this.y = mapData.start.y;
            }else{
                this.x = map.poss.x;
                this.y = map.poss.y;
            }
            console.log("x:"+ this.x + " y:"+ this.y + " world: "+ this.world );
            var realm = RealmContainer.find(this.realm);
			if (realm != null) {
				console.log("teleport");
				realm.teleport(this, oldWorld);
			}			
        };
        return true;
    }
    this.eventLooking = function(x, y) {
    	//console.log("looking" + x + " " + y);
    	var map = MapContainer.find(this.world);
    	if (map != null) {
	        if (typeof map.events.sign[x+"_"+y] != "undefined") {
	    		return {"type" : "sign", "data": map.events.sign[x+"_"+y] };
	    	}else if (typeof map.events.warp[x+"_"+y] != "undefined") {
	    		return {"type" : "warp", "data": map.events.warp[x+"_"+y] };
	    	}else if (typeof map.events.teleport[x+"_"+y] != "undefined") {
	            return {"type" : "teleport", "data": map.events.teleport[x+"_"+y] };
	        }
        };
    	return false;
    }
    this.doZ = function () {
    	var returnData = false;
    	if (this.looking == 0) {
    		returnData = this.eventLooking(this.x, this.y+1);
    	}else if (this.looking == 2) {
    		returnData = this.eventLooking(this.x-1, this.y);
    	}else if (this.looking == 3) {
    		returnData = this.eventLooking(this.x+1, this.y);
    	}else{
    		returnData = this.eventLooking(this.x, this.y-1);
    	}
    	console.log(returnData);
    	if (returnData != false && returnData.type == "sign") {
    		this.ownSocket.emit('loadText', returnData.data)
    		return true;
    	}else{
    		return false;
    	}
    }
}