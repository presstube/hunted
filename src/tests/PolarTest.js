(function(window) {
	
var PolarTest = function() {
	
	var canvas,
		stage,
		circle;
	
	canvas = document.getElementById("canvas");
	stage = new Stage(canvas);
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var circle = new Shape();
	circle.x = canvas.width / 2;
	circle.y = canvas.height / 2;
	circle.graphics.beginStroke('#F00').
					setStrokeStyle(2).
					arc(0, 0, 100, 0, Math.PI).
					beginStroke('#0F0').
					arc(0, 0, 100, Math.PI, 0 );					
	
	stage.addChild(circle);
	

	
	
	var dot = PTUtils.makeCircle('#FFF', 5);
	
	var polarPoint = PTUtils.polarDegrees(100, 110);
	
	dot.x = circle.x + polarPoint.x;
	dot.y = circle.y + polarPoint.y;
	
	stage.addChild(dot);
	
	var angleRads = PTUtils.angleRadians(new Point(circle.x, circle.y), new Point(dot.x, dot.y));
	
	console.log("angleRads: " + angleRads);
	console.log("angleDegrees: " + PTUtils.radsToDegrees(angleRads));
	
	
	Ticker.addListener(this);
	
	this.tick = function() {
//		circle.rotation += 2;
		stage.update();
	};
	
};

window.PolarTest = PolarTest;
}(window));
