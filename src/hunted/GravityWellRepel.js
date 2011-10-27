(function(window){
	
	var GravityWellRepel = function(target) {this.initialize(target);};
	var p = GravityWellRepel.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(target) {
		this.Container_initialize();

		var maxPerimeter = 300,
			minPerimeter = 150, 
			multPerimeter = maxPerimeter - minPerimeter,
			maxForce = 5,
			minForce = 0,
			multForce = 1;

		this.addChild(PTUtils.makeCircle('#00F', maxPerimeter));
		// this.addChild(PTUtils.makeCircle('#00F', minPerimeter));

		this.alpha = 0.2;

		// var innerWell = new GravityWellBubble(target);
		// this.addChild(innerWell);

		this.tick = function() {
			var globalTargetPos = target.localToGlobal(0,0);
			var dist = PTUtils.distance(new Point(0, 0), this.globalToLocal(globalTargetPos.x, globalTargetPos.y));

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
				var degrees = PTUtils.angleDegrees(target, this);
				degrees = PTUtils.getAdjustedRotation(degrees+180);
				target.addForce(PTUtils.polarDegrees(force, degrees)); // degrees+180 for a 'repulsion well'



				// if (dist < 20) {
				// 	target.kill(); // GAME OVER
				// }
			}
		};
	};

	window.GravityWellRepel = GravityWellRepel;

}(window));