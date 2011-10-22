(function(window){
	
	var ShipEngineGeneric = function(props) {
	
		var _p = this.props = props;

		_p.steeringLimit = _p.steeringLimit || 7;
		_p.steeringResponse = _p.steeringResponse || 2;
		_p.thrustLimit = _p.thrustLimit || 1;
		_p.boostThrust = _p.boostThrust || 5;
		_p.boostFuelLimit = _p.boostFuelLimit || 20;
		_p.boostRegenerateFrequency = _p.boostRegenerateFrequency || 5;

		var	boostFuel = _p.boostFuelLimit,
			torque = 0,
			thrust = 0,
			tickCount = 0;
			
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
			if(controls.boost && boostFuel > 0) { 
				force = PTUtils.polarDegrees(_p.boostThrust, ship.rotation);
				ship.addForce(force);
				boostFuel--;
			} else {
				if (boostFuel < _p.boostFuelLimit && tickCount % _p.boostRegenerateFrequency === 0) {
					boostFuel++;
				}
			}
			tickCount++;
			
		};
		
	};

	window.ShipEngineGeneric = ShipEngineGeneric;
}(window));