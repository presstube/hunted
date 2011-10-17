(function(window){
	
	var ShipControlsKeyboard = function(props) {
		
		var keyboardInput = props.keyboardInput;
		
		return {
			
			throttle: 0,
			steering: 0,
			boost: false,
			launch: false,
			
			update: function() {

				if (keyboardInput.upHeld && !keyboardInput.downHeld) {
					this.throttle = 1;
				} else if (keyboardInput.downHeld && !keyboardInput.upHeld) {
					this.throttle = -0.5;
				} else {
					this.throttle = 0;
				}
				
				if (keyboardInput.leftHeld && !keyboardInput.rightHeld) {
					this.steering = -1;
				} else if (keyboardInput.rightHeld && !keyboardInput.leftHeld) {
					this.steering = 1;
				} else {
					this.steering = 0;
				}
				
				if (keyboardInput.shiftHeld) {
					this.boost = true;
				}
				
				if (keyboardInput.spaceHeld) {
					this.launch = true;
				}
			}	
		};
	};
		
	window.ShipControlsKeyboard = ShipControlsKeyboard;

}(window));