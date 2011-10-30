(function(window){
	
	var Boost = function(props) {this.initialize(props);};
	var p = Boost.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {

		var _p = props;

		_p.boostThrust = _p.boostThrust || 5;
		_p.boostFuelLimit = _p.boostFuelLimit || 20;
		_p.boostRegenerateFrequency = _p.boostRegenerateFrequency || 5;

		var boostFuel = _p.boostFuelLimit,
			skin = PTUtils.makeTriangle("777", 20, 20),
			ship = _p.ship,
			controls = ship.controls,
			tickCount = 0,
			force = new Point();

		// skin.rotation = 180;
		skin.y = -10;
		this.addChild(skin);

		this.tick = function() {
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

			skin.scaleX = skin.scaleY = (boostFuel / _p.boostFuelLimit);

			// console.log('boost mult: ' + (boostFuel / _p.boostFuelLimit));
		};

		this.setBoostFuel = function(fuel) {
			boostFuel = fuel;
		};
			
	};

	window.Boost = Boost;

}(window));