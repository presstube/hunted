(function(window){
	
	var ShipEngineGeneric = function(props) {
	
		var _p = this.props = props;

		// defaults
		_p.drag = _p.drag || 0.95;
		_p.steeringLimit = _p.steeringLimit || 7;
		_p.steeringResponse = _p.steeringResponse || 2;
		_p.thrustLimit = _p.thrustLimit || 1;
		_p.boostThrust = _p.boostThrust || 5;
		_p.boostFuelLimit = _p.boostFuelLimit || 20;
		_p.boostRegenerateFrequency = _p.boostRegenerateFrequency || 5;

		var	boostFuel = _p.boostFuelLimit,
			torque = 0,
			thrust = 0,
			vX = 0,
			vY = 0,
			tickCount = 0;
			
		this.update = function() {

			var ship = _p.ship,
				controls = _p.ship.controls,
				torqueDest = controls.steering * _p.steeringLimit;
			
			torque += (torqueDest - torque) / _p.steeringResponse;
			ship.rotation += torque;
			thrust = controls.throttle * _p.thrustLimit;
			var force = PTUtils.polarDegrees(thrust, ship.rotation);
			this.addForce(force);
			if(controls.boost && boostFuel > 0) { 
				force = PTUtils.polarDegrees(_p.boostThrust, ship.rotation);
				this.addForce(force);
				controls.boost = false;
				boostFuel--;
			} else {
				if (boostFuel < _p.boostFuelLimit && tickCount % _p.boostRegenerateFrequency === 0) {
					boostFuel++;
				}
			}
			applyForce();
			applyDrag();
			tickCount++;
			
		};
		
		function applyForce() {
			_p.ship.x += vX;
			_p.ship.y += vY;
		}
		
		function applyDrag() {
			vX *= _p.drag;
			vY *= _p.drag;
		}
		
		this.addForce = function(force) {
			vX += force.x;
			vY += force.y;
		};
		
		this.getVelocity = function() {
			return new Point(vX, vY);
		};

		// engage/disengage engine
		// engage/disengage breaks
		// engage/disengage steering
		// engage/disengage boost
		
	};

	window.ShipEngineGeneric = ShipEngineGeneric;
}(window));