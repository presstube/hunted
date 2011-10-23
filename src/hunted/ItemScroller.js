(function(window) {

	var ItemScroller = function(props) {this.initialize(props);};
	var p = ItemScroller.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		
		this.Container_initialize();
		
		this.props = props || {};
		
		var that = this,
			trackingStage = props.trackingStage,
			scaleStage = (props && props.scaleStage) ? props.scaleStage : this,
			wrapRadius = (props && props.wrapRadius) ? props.wrapRadius : 300,
			numItems = (props && props.numItems) ? props.numItems : 60,
			globalScaleStageCenter = new Point(),
			direction = 0;
			
		this.hitTarget = undefined;

		var populate = function(spread) {

			for (var i = 0; i < numItems; i++) {
				makeItem(i);
			}
			
			function makeItem(i) {
				var color = (i === 0) ? '#0F0' : '#0FF'; 
				var item = PTUtils.makeCircle(color, 2);
				var spawnPoint = PTUtils.polarDegrees(Math.random()*wrapRadius, Math.random()*360);
				item.x = spawnPoint.x;
				item.y = spawnPoint.y;
				item.i = i;
				item.tick = function() {
					var globalItemCenter = this.localToGlobal(0, 0);
					var distanceFromCenter = PTUtils.distance(globalItemCenter, globalScaleStageCenter);
					
	//				if (distanceFromCenter < 40) {
	//					var hitLocal = this.localToLocal(0, 0, that.hitTarget);
	//					this.scaleX = this.scaleY = that.hitTarget.hitTest(hitLocal.x, hitLocal.y) ? 8 : 1;
	//					that.hitTarget.controls.triggerBoost();
	//				}
					
					if ( distanceFromCenter > wrapRadius ) {
						var localScaleStageCenter = that.globalToLocal(globalScaleStageCenter.x, globalScaleStageCenter.y);
						var respawnAngleRadians = PTUtils.getOppositeAngleRadians(direction);
						var respawnPoint = PTUtils.polarRadians(wrapRadius, respawnAngleRadians);
						this.x = localScaleStageCenter.x + respawnPoint.x;
						this.y = localScaleStageCenter.y + respawnPoint.y;
					}
				};
				that.addChild(item);
			}
		};
		
		populate(300);
		
		this.tick = function() {
			globalScaleStageCenter = scaleStage.localToGlobal(0, 0);
			direction = PTUtils.angleRadians(trackingStage.getAmountToMove(), new Point() );
		};
	};

	window.ItemScroller = ItemScroller;	

}(window));