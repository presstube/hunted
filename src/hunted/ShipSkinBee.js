(function(window){
	
	var ShipSkinBee = function(props) { this.initialize(props); };
	var p = ShipSkinBee.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {

		this.Container_initialize();
		
		var _p = this.props = props || {},
			tailOrigin = 180,
			tailSwingRange = 20,
			tail = new Container(),
			exhaustPipe = new ExhaustPipe({host: props.ship}),
			leftBoost = new Boost(props),
			rightBoost = new Boost(props),
			leftLauncher = new Launcher(props),
			rightLauncher = new Launcher(props),
			heatSeekerLauncher = new LauncherHeatSeeker(props),
			peePants = new LauncherPeePants(props),
			left = PTUtils.makeTriangle('#ff0', 40, 40),
			right = PTUtils.makeTriangle('#ff0', 40, 40);

		_p.launcherSpread = _p.launcherSpread || 20;
		_p.shotsPerLaunch = _p.shotsPerLaunch || 3;

		var split = 10;
		left.x = -split;
		right.x = split;

		this.addChild(left);
		this.addChild(right);

		tail.addChild(PTUtils.makeTriangle('#ff0', 20, 20));
		tail.y = -4;
		tail.rotation = 180;
		this.addChild(tail);
		tail.addChild(exhaustPipe);
		exhaustPipe.y = -16;

		this.addChild(leftLauncher);
		this.addChild(rightLauncher);
		leftLauncher.y = -40;
		rightLauncher.y = -40;
		leftLauncher.x = -split;
		rightLauncher.x = split;

		leftBoost.x = -split;
		rightBoost.x = split;
		this.addChild(leftBoost);
		this.addChild(rightBoost);

		var beeBoostStripe = new Shape();
		beeBoostStripe.graphics.beginFill('#000').rect(-5, -30, 10, 30);

		leftBoost.setSkin(beeBoostStripe.clone());
		rightBoost.setSkin(beeBoostStripe.clone());

		// this.leftBoost = leftBoost;

		this.update = function() {
			var controls = _p.ship.controls;
			
			var tailDest;
			if (controls.steering == 1) {
				tailDest = tailOrigin - tailSwingRange;
			} else if (controls.steering == -1) {
				tailDest = tailOrigin + tailSwingRange;
			} else {
				tailDest = tailOrigin;
			}
			tail.rotation += (tailDest - tail.rotation) / 2;

			if (controls.throttle === 0 && exhaustPipe.isEngaged()) {
				exhaustPipe.disengage();
			} else if (controls.throttle !== 0 && !exhaustPipe.isEngaged()) {
				exhaustPipe.engage();
			}
			
			if (controls.launch) {
				for (var i = 0; i < _p.shotsPerLaunch; i++) {
					leftLauncher.rotation = (Math.random() * _p.launcherSpread) - (Math.random() * _p.launcherSpread);
					rightLauncher.rotation = (Math.random() * _p.launcherSpread) - (Math.random() * _p.launcherSpread);
					leftLauncher.launch();
					rightLauncher.launch();
					// heatSeekerLauncher.launch();
				}
				leftLauncher.rotation = 0;
				rightLauncher.rotation = 0;
			}
		};

		this.setBoostFuel = function(boostFuel) {
			leftBoost.setBoostFuel(boostFuel);	
			rightBoost.setBoostFuel(boostFuel);	
		};

		this.kill = function() {
			// props = null;
			if (this.parent) this.parent.removeChild(this);
		};

	};

	window.ShipSkinBee = ShipSkinBee;

}(window));