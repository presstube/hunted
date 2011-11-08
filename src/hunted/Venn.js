(function(window){

	/*
		props { 
			app: app
		}
	*/
	
	var Venn = function(props) {

		var group,
			timout,
			occupied = [];

		function checkForTimer() {
			clearTimeout(timout);
			if (occupied.length > 1) {
				timout = setTimeout(function() {
					trigger(occupied.length);

				}, 1000);
			}
		}

		function trigger(level) {
			console.log("!!VENN: " + occupied.length + "!!");
			player = props.app.getPlayer();
			if (level === 2) player.setSkin(new ShipSkinBee(player.props));
		}

		this.addGroup = function(newGroup) {
			// cleanup any previous groups here??

			group = newGroup;

			_.each(group, function(item){

				item.bind(Bubble.OCCUPIED, function() { 
					occupied.push(item); 
					checkForTimer();
				});

				item.bind(Bubble.VACATED, function() { 
					checkForTimer();
					occupied = _.without(occupied, item); 
				});
			});

		};



	};

	window.Venn = Venn;

}(window));