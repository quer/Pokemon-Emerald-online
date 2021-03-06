(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("store",
{ 
    "height":8,
    "layers":[
        {
         "data":[113, 195, 115, 116, 116, 116, 115, 115, 115, 115, 118, 153, 357, 235, 156, 156, 156, 233, 234, 233, 234, 158, 193, 73, 275, 76, 73, 73, 273, 274, 194, 274, 198, 313, 314, 315, 39, 34, 34, 34, 34, 34, 34, 238, 353, 354, 355, 39, 34, 34, 236, 237, 37, 34, 236, 75, 73, 73, 35, 34, 34, 276, 277, 39, 34, 276, 75, 34, 34, 34, 34, 34, 316, 317, 39, 34, 316, 75, 34, 34, 119, 120, 34, 80, 73, 35, 34, 80],
         "name":"store",
         "firstgid":1
        }, 
        {
         "data":[2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2643, 2643, 2642, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2642, 2643, 2643, 2642, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2642, 2642, 2642, 2642, 2643, 2643, 2643, 2642, 2642, 2643, 2643, 2642, 2643, 2643, 2643, 2643, 2643, 2643, 2642, 2642, 2643, 2643, 2642, 2643, 2643, 2643, 2643, 2643, 2643, 2642, 2642, 2643, 2643, 2642, 2643, 2643, 2643, 2641, 2641, 2643, 2643, 2643, 2643, 2643, 2643],
         "name":"collision",
         "firstgid":2641
        }
    ],
    "tilesets":
        {
         "imageheight":1056,
         "imagewidth":640,
         "width" : 40,
         "height": 66,
         "tileheight":16,
         "tilewidth":16
        },
    "start":{
        "x": 4,
        "y": 6
    },
    "events": {
        "sign":{

        },
        "warp":{

        },
        "teleport": {
            "3_7" : {"map":"fullMap", "poss": {"x": 16, "y": 47}},
            "4_7" : {"map":"fullMap", "poss": {"x": 16, "y": 47}}
        }
    },
    "width":11
});