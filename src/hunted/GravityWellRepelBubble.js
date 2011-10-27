(function(window){
	
	var GravityWellRepelBubble = function(app) {this.initialize(app);};
	var p = GravityWellRepelBubble.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(app) {
		this.Container_initialize();

		var that = this,
			maxPushPerimeter = 300,
			minPushPerimeter = 100, 
			multPushPerimeter = maxPushPerimeter - minPushPerimeter,

			maxPullPerimeter = 100,
			minPullPerimeter = 0, 
			multPullPerimeter = 1,

			maxForce = 5,
			minForce = 0,
			multForce = 1;

		this.addChild(PTUtils.makeCircle('#FFF', maxPushPerimeter));
		this.addChild(PTUtils.makeCircle('#FFF', minPushPerimeter));

		this.alpha = 0.2;

		this.tick = function() {
			checkTarget(app.ship);
			_.each(app.chasers, function(chaser) {
				checkTarget(chaser);
			});
		};

		function checkTarget(target) {
			var force, degrees,
				globalTargetPos = target.localToGlobal(0,0),
				dist = PTUtils.distance(new Point(0, 0), that.globalToLocal(globalTargetPos.x, globalTargetPos.y));

			if (dist < maxPullPerimeter) {
				multPullPerimeter = (dist - minPullPerimeter)/(maxPullPerimeter - minPullPerimeter);
				multPullPerimeter = (multPullPerimeter>maxPullPerimeter) ? maxPullPerimeter : multPullPerimeter;
				multPullPerimeter = (multPullPerimeter<0) ? 0 : multPullPerimeter;
				force = (maxForce*multPullPerimeter);
				degrees = PTUtils.angleDegrees(target, that);
				target.addForce(PTUtils.polarDegrees(force, degrees));
			} else if (dist < maxPushPerimeter) {
				multPushPerimeter = (dist - minPushPerimeter)/(maxPushPerimeter - minPushPerimeter);
				multPushPerimeter = (multPushPerimeter>maxPushPerimeter) ? maxPushPerimeter : multPushPerimeter;
				multPushPerimeter = (multPushPerimeter<0) ? 0 : multPushPerimeter;
				force = maxForce-(maxForce*multPushPerimeter);
				degrees = PTUtils.angleDegrees(target, that);
				target.addForce(PTUtils.polarDegrees(force, degrees+180)); // degrees+180 for a 'repulsion well'
			}
		}
	};

	window.GravityWellRepelBubble = GravityWellRepelBubble;

}(window));