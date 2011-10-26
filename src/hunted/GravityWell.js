(function(window){
	
	var GravityWell = function(target) {this.initialize(target);};
	var p = GravityWell.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(target) {
		this.Container_initialize();

		var radius = 100;

		this.addChild(PTUtils.makeCircle('#FFF', radius));

		this.alpha = 0.5;


		this.tick = function() {
			var globalTargetPos = target.localToGlobal(0,0);
			var dist = PTUtils.distance(new Point(0, 0), this.globalToLocal(globalTargetPos.x, globalTargetPos.y));

			if (dist < radius) {
				var degrees = PTUtils.angleDegrees(target, this);
				target.addForce(PTUtils.polarDegrees(6, degrees));
				// if (dist < 20) {
				// 	target.kill(); // GAME OVER
				// }
			}
		};
	};

	window.GravityWell = GravityWell;

}(window));