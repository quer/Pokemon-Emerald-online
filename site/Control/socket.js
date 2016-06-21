var socket = io.connect();

var realmSelectet = null;
/**
* send to server
*/
$("#bLogin").click(function() {
  if (realmSelectet != null) {
    socket.emit('login', $("#iLogin").val(), realmSelectet, function(data){
        if (data != false) {
            console.log("user log ind");
            console.log(data);
            $( "#login" ).hide();
            $( "canvas" ).show();

            //gameLoop = setInterval( mainloop, fps);
        }else{
            console.log("user not log ind");
        }
    });
  };
});

$( "#realm" ).on( "click", "div", function() {
  realmSelectet = $( this ).attr("realm");
  $( "#realm" ).hide();
  $( "#login" ).show();
});

/**
*   get from server
*/
socket.on('realms', function(data) {
  for (var i = 0; i < data.length; i++) {
      $("#realm").append("<div realm='"+data[i].id+"'>"+data[i].name+" || "+data[i].type+"</div><br>");
  };
});
socket.on('gameUpdate', function(data) {
  game.update(data);
  console.log(data);
});
socket.on('gameNpcUpdate', function(data) {
  game.npcUpdate(data);
  console.log("npc");
})
socket.on('loadText', function (data) {
  game.loadText(data);
});
var key = {
  "left": false,
  "right": false,
  "up": false,
  "down": false,
  "z": false,
  "x": false
}
var lastMoved = new Date().getTime();
var haveEmitMove = false;
function doKey (delta) {
  if(delta % 5 === 0){
    if (key.left == true || key.right == true || key.up == true || key.down == true || key.z == true || key.x == true) {
      if (game.started) {
          console.log("doKey");
          haveEmitMove = true;
          lastMoved = new Date().getTime();
          socket.emit('doKey', key);
      };
    };
    if (haveEmitMove && lastMoved+5 < new Date().getTime()) {
      haveEmitMove = false;
      socket.emit('doKey', key);
    };
  }
}
window.addEventListener('keydown', function(e) {
    
    switch (e.keyCode) {
        case 37:
            if(!key.left){
              socket.emit('doKey', "left");
            }
            key.left = true;
            break;
        case 39:
          if(!key.right){
              socket.emit('doKey', "right");
            }
            key.right = true;
            break;
        case 38:  
          if(!key.up){
              socket.emit('doKey', "up");
            }
            key.up = true;
            break;
        case 40:
          if(!key.down){
              socket.emit('doKey', "down");
            }
            key.down = true;
            break;
        case 90:
          if(!key.z){
              socket.emit('doKey', "z");
            }
          key.z = true;
            break;
        case 88:
          if(!key.x){
              socket.emit('doKey', "x");
            }
            key.x = true;
            break;
    }
}, false);
window.addEventListener('keyup', function(e) {
    switch (e.keyCode) {
        case 37:
          if(key.left){
            socket.emit('endKey', "left");
          }
          key.left = false;
          break;
        case 39:
          if(key.right){
            socket.emit('endKey', "right");
          }
          key.right = false;
          break;
        case 38:
            if(key.up){
            socket.emit('endKey', "up");
          }
          key.up = false;
          break;
        case 40:
          if(key.down){
            socket.emit('endKey', "down");
          }
          key.down = false;
          break;
        case 90:
          if(key.z){
            socket.emit('endKey', "z");
          }
          key.z = false;
          break;
        case 88:
          if(key.x){
            socket.emit('endKey', "x");
          }
          key.x = false;
          break;
    }
}, false);

/**
* Ping test 
*
var startTime;
setInterval(function() {
  startTime = Date.now();
  socket.emit('ping');
}, 2000);
socket.on('pong', function() {
  latency = Date.now() - startTime;
  console.log(latency);
});
*/