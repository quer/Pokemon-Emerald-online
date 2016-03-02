function Map (data) {
	this.data = [];
	//loading world/map
	this.height = data.height;
	this.width = data.width;
	this.image = document.getElementById("fullSheet");
	this.tilesets = data.tilesets;
	this.events = data.events;
	this.name = data.layers[0].name;
	this.start = data.start;
	for (var i = 0; i < data.layers.length; i++) {
		console.log("build :" + i);
		var layer = data.layers[i];
		var firstgid = layer.firstgid;
		var endArray = new Array(data.width);
		for (var a = 0; a < endArray.length; a++) {
			endArray[a] = new Array(data.height);
		}
		var index = 0;
		for (var ii = 0; ii < data.height; ii++) {
			for (var iii = 0; iii < data.width; iii++) {
				//console.log(iii + " "+ ii);
				endArray[iii][ii] = (layer.data[index] - firstgid);
				index++;
			};
		};
		this.data.push(endArray);
		/*console.log(endArray.join('\n'));
		console.log("new..");
		console.log(this.data[layer.name].join('\n'));
		*/
	}
	//console.log(this.data["map"].join('\n'));
}