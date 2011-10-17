(function(window){
	
	var ShipControlsAIWander = function(props) {
		
		return {
			throttle: 0,
			steering: 0,
			boost: false,
			
			update: function() {
				if (Math.random() > 0.9) {
					this.throttle = this.throttle === 1 ? 0 : 1;
				}
				if (Math.random() > 0.9) {
					this.steering = -1 + (Math.random() * 2);
				}
			}
		};
	};
		
	window.ShipControlsAIWander = ShipControlsAIWander;
	
}(window));