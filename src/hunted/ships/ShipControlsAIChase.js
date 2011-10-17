(function(window){
	
	var ShipControlsAIChase = function(props) {
		
		var ship = props.ship,
			target = props.target,
			steeringAccuracy = props.steeringAccuracy || 5,
			shipPos = new Point(),
			targetPos = new Point(),
			angleToTarget = 0,
			diff = 0;
		
		return {
			throttle: 1,
			steering: 0,
			boost: false,
			
			update : function() {
				shipPos = new Point(ship.x, ship.y);
				shipRot = PTUtils.getAdjustedRotation(ship.rotation);
				targetPos = new Point(target.x, target.y);
				angleToTarget = PTUtils.angleDegrees(shipPos, targetPos);
				diff = shipRot - angleToTarget;
				
				if (diff > 180) { // correct for when you cross over the 180/-180 point
					diff = -(360 - diff);
				} else if (diff < -180) {
					diff = -(-360 - diff);
				}
				
				if (diff <= -(steeringAccuracy)) {
					this.steering = 1;
				} else if (diff >= steeringAccuracy) {
					this.steering = -1;
				} else {
					this.steering = 0;
				}
				
				if (Math.random() > 0.5 && this.throttle === 1) {
					this.throttle = 0;
				} else if (Math.random() > 0.5 && this.throttle === 0) {
					this.throttle = 1;
				}
			}
		};
	};
		
	window.ShipControlsAIChase = ShipControlsAIChase;
	
}(window));