(function(window){
	
	var GravityWell = function(target) {this.initialize(target);};
	var p = GravityWell.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(target) {
		this.Container_initialize();

		var maxPerimeter = 300,
			minPerimeter = 0, 
			multPerimeter = maxPerimeter - minPerimeter,
			maxForce = 5,
			minForce = 0,
			multForce = 1;

		this.addChild(PTUtils.makeCircle('#FFF', maxPerimeter));

		this.alpha = 0.8


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

				var degrees = PTUtils.angleDegrees(target, this);
				target.addForce(PTUtils.polarDegrees(maxForce-(maxForce*multPerimeter), degrees/*+180*/)); // degrees+180 for a 'repulsion well'



				// if (dist < 20) {
				// 	target.kill(); // GAME OVER
				// }
			}
		};
	};

	window.GravityWell = GravityWell;

}(window));