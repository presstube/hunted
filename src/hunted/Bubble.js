(function(window){

	/*
		props { 
			app: app,
		}
	*/
	
	var Bubble = function(props) {this.initialize(props);};
	var p = Bubble.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize();

		var _p = this.props = props;

		Bubble.VACATED = "VACATED";
		Bubble.OCCUPIED = "OCCUPIED";

		var gravityWell = this,
			app = props.app,
			state = Bubble.VACATED,
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

		_.extend(this, Backbone.Events);

		// this.bind(Bubble.VACATED, function(msg) { console.log("VACATED: " + msg); });
		// this.bind(Bubble.OCCUPIED, function(msg) { console.log("OCCUPIED: " + msg); });

		var outer = PTUtils.makeCircle('#FFF', maxPushPerimeter);
		outer.alpha = 0.2;

		this.addChild(outer);
		this.addChild(PTUtils.makeCircle('#FFF', minPushPerimeter));

		this.alpha = 0.1;

		// there is some ugliness here that needs to be sorted, perhaps a register/unregisterTarget(target)

		function setState(newState) {

			state = newState;

			if (state === Bubble.VACATED) {
				gravityWell.trigger(Bubble.VACATED, gravityWell);
				
			} else if (state === Bubble.OCCUPIED) {
				app.player.skin.setBoostFuel(app.player.props.boostFuelLimit);
				gravityWell.trigger(Bubble.OCCUPIED, gravityWell);
				
			}
		}

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
				if (state === Bubble.VACATED && target === app.player) { setState(Bubble.OCCUPIED); }
				multPullPerimeter = (dist - minPullPerimeter)/(maxPullPerimeter - minPullPerimeter);
				multPullPerimeter = (multPullPerimeter>maxPullPerimeter) ? maxPullPerimeter : multPullPerimeter;
				multPullPerimeter = (multPullPerimeter<0) ? 0 : multPullPerimeter;
				force = (maxForce*multPullPerimeter);
				degrees = PTUtils.angleDegrees(target, gravityWell);
				target.addForce(PTUtils.polarDegrees(force, degrees));

			} else if (dist < maxPushPerimeter) {
				if (state === Bubble.OCCUPIED  && target === app.player) { setState(Bubble.VACATED); }
				multPushPerimeter = (dist - minPushPerimeter)/(maxPushPerimeter - minPushPerimeter);
				multPushPerimeter = (multPushPerimeter>maxPushPerimeter) ? maxPushPerimeter : multPushPerimeter;
				multPushPerimeter = (multPushPerimeter<0) ? 0 : multPushPerimeter;
				force = maxForce-(maxForce*multPushPerimeter);
				degrees = PTUtils.angleDegrees(target, gravityWell);
				target.addForce(PTUtils.polarDegrees(force, degrees+180)); // degrees+180 for a 'repulsion well'
			}
		}
	};

	Bubble.prototype.toString = function() {
		return "[Bubble]"; 
	};


	window.Bubble = Bubble;

}(window));