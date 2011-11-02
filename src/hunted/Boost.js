(function(window){

	/*
		props { 
			ship: the host ship
			boostThrust: boostThrust,
			boostFuelLimit: boostFuelLimit,
			boostRegenerateFrequency: boostRegenerateFrequency
		}
	*/
	
	var Boost = function(props) {this.initialize(props);};
	var p = Boost.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {

		this.Container_initialize();

		var _p = props;

		_p.boostThrust = _p.boostThrust || 5;
		_p.boostFuelLimit = _p.boostFuelLimit || 20;
		_p.boostRegenerateFrequency = _p.boostRegenerateFrequency || 5;

		var boost = this,
			boostFuel = _p.boostFuelLimit,
			width = 20,
			skin,
			ship = _p.ship,
			controls = ship.controls,
			tickCount = 0,
			force = new Point(),
			name = Math.random();

		setSkin(PTUtils.makeTriangle("fff", width, width));

		this.tick = function() {
			if(controls.boost && boostFuel > 0) { 
				var mult = boostFuel / _p.boostFuelLimit;
				force = PTUtils.polarDegrees(_p.boostThrust/*mult*/, ship.rotation);
				ship.addForce(force);
				boostFuel--;
				var shudder = 5;
				// app.stage.x += Math.random()*shudder*mult - Math.random()*shudder*mult;
				// app.stage.y += Math.random()*shudder*mult - Math.random()*shudder*mult;
				app.stage.x += Math.random()*shudder - Math.random()*shudder;
				app.stage.y += Math.random()*shudder - Math.random()*shudder;
				var boostChunk = skin.clone();
				// var boostChunk = PTUtils.makeTriangle('#fff', width*mult, width*mult);
				boostChunk.x = ship.x;
				boostChunk.y = ship.y;
				boostChunk.rotation = ship.rotation;
				app.trackingStage.addChildAt(boostChunk, ship.parent.getChildIndex(ship));
				_.delay(function(){
					app.trackingStage.removeChild(boostChunk);
				}, 300);
			} else {
				if (boostFuel < _p.boostFuelLimit && tickCount % _p.boostRegenerateFrequency === 0) {
					boostFuel++;
				}
			}
			tickCount++;
			// skin.scaleX = 
			skin.scaleY = (boostFuel / _p.boostFuelLimit);
		};

		this.setBoostFuel = function(fuel) {
			boostFuel = fuel;
		};

		function setSkin(newSkin) {
			if(skin) boost.removeChild(skin);
			boost.addChild(skin = newSkin);
		}

		this.setSkin = setSkin;

		this.kill = function() {
				
		};
			
	};

	window.Boost = Boost;

}(window));