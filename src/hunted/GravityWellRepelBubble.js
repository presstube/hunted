(function(window){

	/*
		props { 
			app: app,
		}
	*/
	
	var GravityWellRepelBubble = function(props) {this.initialize(props);};
	var p = GravityWellRepelBubble.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize();

		var gravityWell = this,
			app = props.app,
			maxPushPerimeter = 300,
			minPushPerimeter = 150, 
			multPushPerimeter = maxPushPerimeter - minPushPerimeter,

			maxPullPerimeter = 150,
			minPullPerimeter = 0, 
			multPullPerimeter = 1,

			maxForce = 5,
			minForce = 0,
			multForce = 1,

			playerDist = 0;

		this.addChild(PTUtils.makeCircle('#FFF', maxPushPerimeter));
		this.addChild(PTUtils.makeCircle('#FFF', minPushPerimeter));

		this.alpha = 0.2;

		// there is some ugliness here that needs to be sorted, perhaps a register/unregisterTarget(target)

		this.tick = function() {
			var globalTargetPos = app.player.localToGlobal(0,0);
			playerDist = PTUtils.distance(new Point(0, 0), gravityWell.globalToLocal(globalTargetPos.x, globalTargetPos.y));

			// would be good if targets were added and removed via an api instead of hard coded like this

			_.each(app.chasers, function(chaser) {
				checkTarget(chaser);
			});
			if (playerDist < 800) { // if the player is close enough check the projectiles too, otherwise it become too heavy
				checkTarget(app.player, playerDist);
				_.each(app.projectiles, function(projectile){
					checkTarget(projectile);
				});
			}
		};

		function checkTarget(target, dist) {
			var force, degrees;
				
			if (!dist) {
				var globalTargetPos = target.localToGlobal(0,0);
				dist = PTUtils.distance(new Point(0, 0), gravityWell.globalToLocal(globalTargetPos.x, globalTargetPos.y));
			}

			if (dist < maxPullPerimeter) {
				multPullPerimeter = (dist - minPullPerimeter)/(maxPullPerimeter - minPullPerimeter);
				multPullPerimeter = (multPullPerimeter>maxPullPerimeter) ? maxPullPerimeter : multPullPerimeter;
				multPullPerimeter = (multPullPerimeter<0) ? 0 : multPullPerimeter;
				force = (maxForce*multPullPerimeter);
				degrees = PTUtils.angleDegrees(target, gravityWell);
				target.addForce(PTUtils.polarDegrees(force, degrees));

			} else if (dist < maxPushPerimeter) {
				multPushPerimeter = (dist - minPushPerimeter)/(maxPushPerimeter - minPushPerimeter);
				multPushPerimeter = (multPushPerimeter>maxPushPerimeter) ? maxPushPerimeter : multPushPerimeter;
				multPushPerimeter = (multPushPerimeter<0) ? 0 : multPushPerimeter;
				force = maxForce-(maxForce*multPushPerimeter);
				degrees = PTUtils.angleDegrees(target, gravityWell);
				target.addForce(PTUtils.polarDegrees(force, degrees+180)); // degrees+180 for a 'repulsion well'
			}
		}
	};

	window.GravityWellRepelBubble = GravityWellRepelBubble;

}(window));