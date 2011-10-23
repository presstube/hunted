(function(window) {

	var ScaleStage = function() {this.initialize();};
	var p = ScaleStage.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function() {
		
		this.Container_initialize();
		
		var targetScale = 1;
		
		this.setTargetScale = function(scale) {
			if (scale === null) {
				targetScale = 1;
				this.tick = null;
			} else { 
				targetScale = scale;
				this.tick = function() {
					this.scaleX += (targetScale - this.scaleX) / 2;
					this.scaleY += (targetScale - this.scaleY) / 2;
				};
			}
		};
		
		this.getTargetScale = function() { return targetScale; };
	};

	p.toString = function() {
		return "[ScaleStage (name="+  this.name +")]";
	};

	window.ScaleStage = ScaleStage;

}(window));