(function(window) {

	var TrackingStage = function() {this.initialize();};
	var p = TrackingStage.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function() {
		
		this.Container_initialize();
		
		var trackingTarget,
			trackingSpeed = 1.5,
			amountToMove = new Point();

		this.setTrackingTarget = function(target) {	
			trackingTarget = target;
			if (target) {
				// start tracking
				this.tick = function() {
					amountToMove = new Point(
						(-trackingTarget.x - this.x)/trackingSpeed, 
						(-trackingTarget.y - this.y)/trackingSpeed);
					this.x += amountToMove.x;
					this.y += amountToMove.y;
				};
			} else {
				// stop tracking
				this.tick = null;
			}
		};
		
		this.getAmountToMove = function() {
			return amountToMove;
		};
		
		this.toString = function() {
			return "[TrackingStage (name="+  this.name +")]";
		};	
		
	};

	window.TrackingStage = TrackingStage;

}(window));