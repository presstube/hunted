(function(window){
	
	var ShipControlsAIWander = function(props) {
		
		var that = this;

		this.throttle = 0;
		this.steering = 0;

		this.update = function() {

			setSteering();
			setThrottle();

			function setSteering() {
				if (Math.random() > 0.9) {
					that.steering = -1 + (Math.random() * 2);
				}
			}

			function setThrottle() {
				if (Math.random() > 0.9) {
					that.throttle = that.throttle === 1 ? 0 : 1;
				}
			}
		};

	};
		
	window.ShipControlsAIWander = ShipControlsAIWander;
	
}(window));