(function(window){
	
	var ShipControlsAIChase = function(props) {
		
		var that = this,
			ship = props.ship,
			target = props.target,
			steeringAccuracy = props.steeringAccuracy || 5,
			shipPos = new Point(),
			targetPos = new Point(),
			angleToTarget = 0,
			diff = 0;

		this.throttle = 0;
		this.steering = 0;

		this.update = function() {

			setSteering();
			setThrottle();

			function setSteering() {
				shipPos = new Point(ship.x, ship.y);
				shipRot = PTUtils.getAdjustedRotation(ship.rotation); targetPos = new Point(target.x, target.y); angleToTarget = PTUtils.angleDegrees(shipPos, targetPos); diff = shipRot - angleToTarget;
				
				if (diff > 180) { // correct for when you cross over the 180/-180 rotation value
					diff = -(360 - diff);
				} else if (diff < -180) {
					diff = -(-360 - diff);
				}
				
				if (diff <= -(steeringAccuracy)) {		// if target is to the left
					that.steering = 1;					// go right
				} else if (diff >= steeringAccuracy) {	// else if target is to right
					that.steering = -1;					// go left
				} else {
					that.steering = 0;
				}
			}
			
			function setThrottle() {
				if (Math.random() > 0.5 && that.throttle === 1) {
					that.throttle = 0;
				} else if (Math.random() > 0.5 && that.throttle === 0) {
					that.throttle = 1;
				}
			}
			
		};

	};
		
	window.ShipControlsAIChase = ShipControlsAIChase;
	
}(window));