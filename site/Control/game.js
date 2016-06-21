var can = document.getElementById('game');
var	ctx = can.getContext('2d');

var game = {
    playerData: {},
    world: "",
    started: false,
    text: null,
	load: function (can, ctx) {
        can.width  = Window.SCALE_WIDTH();
		can.height = Window.SCALE_HEIGHT();
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
        Rooms.load();
        //Camera.load();
        
	},
    update: function (playerData) {
        if(!this.started){
            game.load(can, ctx);
            startGame();
            this.started = true;
        }
        // to reset npc. so they not in new map
        if (this.world != playerData.world) {
            this.world = playerData.world;
            npcContainer.load([]);
        };
        console.log("game update!");
        this.playerData = playerData;
        playerContainer.load(playerData.users)
        World.load(playerData.world);
        Camera.heroXOffset = playerData.camera.x;
        Camera.heroYOffset = playerData.camera.y;
        Camera.load();
    },
    npcUpdate: function (npcData) {
        console.log(npcData);
        npcContainer.load(npcData);
        //stopGame();
    },
	render: function (ctx) {
        var start = Date.now();
        ctx.fillStyle="black";
		ctx.save();
        ctx.translate(-0 + -(Camera.worldXOffset * (Tile.REAL_SIZE())), -0 + -(Camera.worldYOffset * (Tile.REAL_SIZE())));
        // clear the viewport
        ctx.clearRect(-0 + -(Camera.worldXOffset * (Tile.REAL_SIZE())), -0 + -(Camera.worldYOffset * (Tile.REAL_SIZE())), Window.SCALE_WIDTH(), Window.SCALE_HEIGHT());
		

			World.render(ctx, 0 + Camera.worldXOffset, 0 + Camera.worldYOffset , 0);
            playerContainer.render(ctx);
            npcContainer.render(ctx);
            //the top of building and the map
            World.render(ctx, 0 + Camera.worldXOffset, 0 + Camera.worldYOffset , 1);

			text.render(ctx);
		ctx.restore();

        var end = Date.now();
        ctx.font = '16px sans-serif'
        ctx.textAlign = 'center';
        ctx.fillText('Rendered in ' + (end - start) + ' ms', can.width / 2, can.height - 20);
	},
    loadText: function (text) {
        text.setText(text);
    }
}
//game.load(can, ctx);

var fps = 1000 / 30 ;
var delta = 0;
var mainloop = function() {
	delta++;
	game.render(ctx);
    doKey(delta);
    //console.log("game loop");
};
var gameLoop = null;
function startGame () {
    if (gameLoop == null) {
        gameLoop = setInterval(mainloop, fps);
        console.log("game start");
    };
}
function stopGame () {
    console.log("stopGame");
	clearInterval(gameLoop);
    gameLoop = null;
}