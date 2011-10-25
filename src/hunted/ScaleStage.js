(function(window) {

	var ScaleStage = function() {this.initialize();};
	var p = ScaleStage.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function() {
		
		this.Container_initialize();
		
		var that = this,
			targetScale = 1,
			maxScale = 1,
			minScale = 0.1,
			range = maxScale - minScale;

			setRange();

		
		function setTargetScale(scale) {
			if (scale === null) {
				targetScale = 1;
				that.tick = null;
			} else { 
				targetScale = scale;
				that.tick = function() {
					this.scaleX += (targetScale - this.scaleX) / 2;
					this.scaleY += (targetScale - this.scaleY) / 2;
				};
			}
		}

		this.setScaleMultiplier = function(multiplier) {
			setTargetScale(minScale + (range * multiplier));
		};

		this.setMaxScale = function(max) {
			maxScale = max;
			setRange(); 
		};
		
		this.setMinScale = function(min) {
			minScale = min;
			setRange(); 
		};

		function setRange() {
			range = maxScale - minScale;
		}
		
		this.getTargetScale = function() { return targetScale; };
	};



	p.toString = function() {
		return "[ScaleStage (name="+  this.name +")]";
	};

	window.ScaleStage = ScaleStage;

}(window));