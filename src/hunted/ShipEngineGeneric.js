(function(window){
	
	var ShipEngineGeneric = function(props) {
	
		var _p = this.props = props;

		_p.steeringLimit = _p.steeringLimit || 7;
		_p.steeringResponse = _p.steeringResponse || 2;
		_p.thrustLimit = _p.thrustLimit || 1;

		var	torque = 0,
			thrust = 0;
			
		this.update = function() {

			var ship = _p.ship,
				controls = _p.ship.controls,
				torqueDest = controls.steering * _p.steeringLimit,
				force;
			
			torque += (torqueDest - torque) / _p.steeringResponse;
			ship.rotation += torque;
			thrust = controls.throttle * _p.thrustLimit;
			force = PTUtils.polarDegrees(thrust, ship.rotation);
			ship.addForce(force);
		};
	};

	window.ShipEngineGeneric = ShipEngineGeneric;
}(window));