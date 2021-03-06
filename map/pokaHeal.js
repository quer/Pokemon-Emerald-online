(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }})("pokaHeal",
{ 
    "height":9,
    "layers":[
        {
            "data":[1553, 1554, 2034, 2035, 1556, 1556, 1556, 1875, 1876, 1556, 1557, 1558, 1559, 1560, 1593, 1594, 2074, 2075, 1873, 1675, 1676, 1915, 1916, 1874, 1513, 1598, 1599, 1600, 1633, 1634, 1758, 1759, 1913, 1715, 1716, 1955, 1956, 1914, 1677, 1638, 1639, 1640, 1673, 1679, 1757, 1515, 1953, 1674, 1674, 1674, 1674, 1954, 1797, 1515, 1515, 1680, 1673, 1515, 1515, 1515, 1993, 2037, 2038, 2039, 2040, 1519, 1678, 1515, 1515, 1680, 2153, 2154, 1515, 1515, 1515, 1753, 1754, 1755, 1756, 1515, 1515, 1515, 1515, 1680, 2193, 2194, 1515, 1515, 1515, 1793, 1794, 1795, 1796, 1515, 1757, 1798, 1799, 1680, 2233, 2234, 1515, 1515, 1515, 1833, 1834, 1835, 1836, 1515, 1679, 1838, 1839, 1680, 1713, 1515, 1515, 1515, 1515, 1515, 1516, 1517, 1515, 1515, 1515, 1679, 1757, 1760],
            "name":"pokaHeal",
            "firstgid":1
        }, 
        {
            "data":[2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2642, 2643, 2643, 2643, 2642, 2642, 2642, 2643, 2642, 2642, 2643, 2643, 2643, 2642, 2643, 2643, 2643, 2643, 2642, 2642, 2642, 2642, 2642, 2642, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2642, 2642, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2642, 2641, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2642, 2642, 2643, 2642, 2642, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2643, 2642, 2642, 2643, 2642, 2643, 2643, 2643, 2643, 2643, 2641, 2641, 2643, 2643, 2643, 2643, 2643, 2642],
            "name":"collision",
            "firstgid":2641
        }
    ],
    "tilesets":{
        "imageheight":1056,
        "imagewidth":640,
        "width" : 40,
        "height": 66,
        "tileheight":16,
        "tilewidth":16
    },
    "start":{
        "x": 7,
        "y": 7
    },
    "events": {
        "sign":{
            "10_1" : [
                "here you can check your mail!",
                "and mutch more"
            ]
        },
        "warp":{

        },
        "teleport": {
            "1_6" : {"map":"pokaHeal_02", "poss": null},
            "6_8" : {"map":"fullMap", "poss": {"x": 16, "y": 39}},
            "7_8" : {"map":"fullMap", "poss": {"x": 16, "y": 39}}
        }
    },
    "width":14
});