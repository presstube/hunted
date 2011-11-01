hitTestTest = function() {
	
	
	// A blue circle will move across the screen and will pass over a yellow dot.
	// If the blueCircle is hitting the yellowDot, then the yellowDot's scaleY will change.
	
	var canvas = document.getElementById("canvas");
	var stage = new Stage(canvas);
	
	var blueCircle = new Container();
	blueCircle.name = "blueCircle";
	var c = new Shape();
	c.graphics.beginFill('00f').drawCircle(0, 0, 20);
	blueCircle.y = 40;
	blueCircle.addChild(c);
	stage.addChild(blueCircle);
	
	var yellowDot = new Shape();
	yellowDot.graphics.beginFill('ff0').drawCircle(0, 0, 2);
	yellowDot.x = 50;
	yellowDot.y = 40;
	stage.addChild(yellowDot);
	
	function checkForHit() {
		var localHitPoint = yellowDot.localToLocal(0, 0, blueCircle); 
		var hit = blueCircle.hitTest(localHitPoint.x, localHitPoint.y);
		yellowDot.scaleY = (hit) ? 4 : 1;
	}
	
	this.tick = function() { // from here it works as expected
		checkForHit();
		stage.update();
	};

	blueCircle.tick = function() { // from here, things get weird
		this.x += 1; 
//		checkForHit();
	};
	
	yellowDot.tick = function() { // from here, things get weirder
//		checkForHit();
	};
	
	Ticker.setFPS(30);
	Ticker.addListener(this);
};