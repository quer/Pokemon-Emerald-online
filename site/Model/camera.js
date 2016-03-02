var Camera = {
	worldXOffset: 0,
	worldYOffset: 0,
	heroXOffset: 0,
	heroYOffset: 0,
	load: function () {
		//console.log("Camera Dpo......");
		var hafeWindowTileSizeWidth = Math.ceil((Window.REAL_WIDTH()/Tile.SIZE) / 2 );
		var hafeWindowTileSizeheight = Math.ceil((Window.REAL_HEIGHT()/Tile.SIZE) / 2 );
		if(World.map.width < (hafeWindowTileSizeWidth*2)){
			this.worldXOffset = 0;
		}else if (hafeWindowTileSizeWidth >= this.heroXOffset) {
			this.worldXOffset = 0;
			//console.log("width under halv");
		}else if ((World.map.width - hafeWindowTileSizeWidth) <= this.heroXOffset) {
			this.worldXOffset = Math.floor(World.map.width - (hafeWindowTileSizeWidth*2));
			//console.log("width over halv");
		}else{
			this.worldXOffset = Math.floor(this.heroXOffset - hafeWindowTileSizeWidth);
			//console.log("width aldt andet");
		}

		if(World.map.height < (hafeWindowTileSizeheight*2)){
			this.worldYOffset = 0;
		}else if (hafeWindowTileSizeheight >= this.heroYOffset) {
			this.worldYOffset = 0;
			//console.log("height under halv");
		}else if ((World.map.height - hafeWindowTileSizeheight) <= this.heroYOffset) {
			this.worldYOffset = Math.floor(World.map.height - (Window.REAL_HEIGHT()/Tile.SIZE));
			//console.log("height over halv");
		}else{
			this.worldYOffset = Math.floor(this.heroYOffset - hafeWindowTileSizeheight);
			//console.log("height aldt andet");
		}
	}
}