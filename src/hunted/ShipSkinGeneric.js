(function(window){
	
	var ShipSkinGeneric = function(props) { this.initialize(props); };
	var p = ShipSkinGeneric.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {

		this.Container_initialize();
		
		var _p = this.props = props || {},
			tailOrigin = 180,
			tailSwingRange = 20,
			tail = new Container(),
			exhaustPipe = new ExhaustPipe(props),
			launcher = new Launcher(props),
			heatSeekerLauncher = new LauncherHeatSeeker(props);

		// defaults
		_p.launcherSpread = _p.launcherSpread || 20;
		_p.shotsPerLaunch = _p.shotsPerLaunch || 3;

		this.addChild(PTUtils.makeTriangle('#222', 40, 40));
		tail.addChild(PTUtils.makeTriangle('#222', 20, 20));
		tail.y = -4;
		tail.rotation = 180;
		this.addChild(tail);
		tail.addChild(exhaustPipe);
		exhaustPipe.y = -16;
		this.addChild(launcher);
		launcher.y = -40;

		this.addChild(heatSeekerLauncher);
		heatSeekerLauncher.y = -40;

		this.props.ship.launcher = launcher;

		this.update = function() {
			var controls = this.props.ship.controls;
			
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
			
			
			
			if (controls.seeker) {
				for (var i = 0; i < _p.shotsPerLaunch; i++) {
					heatSeekerLauncher.launch();
				}
			}			

			if (controls.launch) {
				for (var i = 0; i < _p.shotsPerLaunch; i++) {
					launcher.rotation = (Math.random() * _p.launcherSpread) - (Math.random() * _p.launcherSpread);
					launcher.launch();
					// heatSeekerLauncher.launch();
				}
				launcher.rotation = 0;
			}
		};
	};

	window.ShipSkinGeneric = ShipSkinGeneric;

}(window));