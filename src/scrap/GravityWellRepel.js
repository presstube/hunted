(function(window){
	
	var GravityWellRepel = function(app) {this.initialize(app);};
	var p = GravityWellRepel.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(app) {
		this.Container_initialize();

		var that = this,
			maxPerimeter = 300,
			minPerimeter = 0, 
			multPerimeter = maxPerimeter - minPerimeter,
			maxForce = 5,
			minForce = 0,
			multForce = 1;

		this.addChild(PTUtils.makeCircle('#040', maxPerimeter));
		// this.addChild(PTUtils.makeCircle('#00F', minPerimeter));

		this.alpha = 0.2;

		// var innerWell = new GravityWellBubble(target);
		// this.addChild(innerWell);

		this.tick = function() {
			checkTarget(app.ship);
			_.each(app.chasers, function(chaser) {
				checkTarget(chaser);
			});
			_.each(app.projectiles, function(projectile){
				checkTarget(projectile);
			});
		};

		function checkTarget(target) {
			var globalTargetPos = target.localToGlobal(0,0);
			var dist = PTUtils.distance(new Point(0, 0), that.globalToLocal(globalTargetPos.x, globalTargetPos.y));

			if (dist < maxPerimeter) {

				// console.log("perimeter: " + maxPerimeter);
				// console.log("dist: " + dist);

				multPerimeter = (dist - minPerimeter)/(maxPerimeter - minPerimeter);
				multPerimeter = (multPerimeter>maxPerimeter) ? maxPerimeter : multPerimeter;
				multPerimeter = (multPerimeter<0) ? 0 : multPerimeter;

				// console.log("multPerimeter: " + multPerimeter);

				// multForce = 1 - multForce;

				var force = (maxForce*multPerimeter);
				// var force = maxForce-(maxForce*multPerimeter);
				// console.log("multPerimeter: " + multPerimeter);
				// console.log("force: " + force);
				var degrees = PTUtils.angleDegrees(target, that);
				degrees = PTUtils.getAdjustedRotation(degrees+180);
				target.addForce(PTUtils.polarDegrees(force, degrees)); // degrees+180 for a 'repulsion well'



				// if (dist < 20) {
				// 	target.kill(); // GAME OVER
				// }
			}
		}
	};

	window.GravityWellRepel = GravityWellRepel;

}(window));