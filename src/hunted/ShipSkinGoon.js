(function(window){
	
	var ShipSkinGoon = function(props) { this.initialize(props); };
	var p = ShipSkinGoon.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize();
		
		var _p = this.props = props || {},
			tailOrigin = 180,
			tailSwingRange = 20,
			tail = new Container(),
			exhaustPipe = new ExhaustPipe(props),
			launcher = new Launcher(props);
		
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
		};
		
		_p.ship.launcher = launcher;
		this.addChild(PTUtils.makeTriangle('#F00', 40, 40));
		tail.addChild(PTUtils.makeTriangle('#f00', 20, 20));
		tail.y = -4;
		tail.rotation = 180;
		this.addChild(tail);
		tail.addChild(exhaustPipe);
		exhaustPipe.y = -16;
		this.addChild(launcher);
		launcher.y = -40;
	};

	window.ShipSkinGoon = ShipSkinGoon;

}(window));