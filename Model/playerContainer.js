module.exports = {
	container: [],
	add: function (playerObj) {
		this.container.push(playerObj);
	},
	remove: function (playerObj, RealmContainer) {
		var realm = RealmContainer.find(playerObj.realm);
		if (realm != null) {
			var world = realm.find(playerObj.world);
			if (world != null) {
				for (var i = 0; i < world.playerContainer.length; i++) {
					if(world.playerContainer[i].name == playerObj.name)
						return world.playerContainer.splice(i, 1);
				}
			}
		}
		return false;
	},
	buildPlayerToClient: function (playerObj, RealmContainer, emit) {
		//console.log(RealmContainer);
		var realm = RealmContainer.find(playerObj.realm);
		if (realm != null) {
			var world = realm.find(playerObj.world);
			if (world != null) {
				//console.log(world);
				var users = world.playerContainer;
				//console.log(users);
				var buildUsers = [];
				for (var i = 0; i < users.length; i++) {
					buildUsers.push(users[i].build());
				};
				return {"buildUsers": buildUsers, "users": users};
				//return {"users": returnUsers, "camera" : {"x":playerObj.x, "y": playerObj.y}, "world": playerObj.world};

			}
		}
		return null;
	}
}