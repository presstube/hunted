(function(window) {

	var ItemScroller = function(props) {this.initialize(props);};
	var p = ItemScroller.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		
		this.Container_initialize();
		
		var _p = this.props = props || {};
		
		var that = this,
			trackingStage = props.trackingStage,
			scaleStage = (props && props.scaleStage) ? props.scaleStage : this,
			wrapRadius = (props && props.wrapRadius) ? props.wrapRadius : 300,
			numItems = (props && props.numItems) ? props.numItems : 60,
			globalScaleStageCenter = new Point(),
			direction = 0,
			items = [];

			console.log("wr: " + wrapRadius);
			
		this.hitTarget = undefined;

		var populate = function(spread) {

			for (var i = 0; i < numItems; i++) {
				makeItem(i);
			}
			
			function makeItem(i) {
				var color = (i === 0) ? '#0F0' : '#0FF'; 
				var item = new GravityWell(_p.ship);
				// var item = PTUtils.makeCircle(color, 2);
				var spawnPoint = PTUtils.polarDegrees(((Math.random()*(wrapRadius-100)))+100, Math.random() * 360);
				item.x = spawnPoint.x;
				item.y = spawnPoint.y;
				item.i = i;
				items.push(item);
				that.addChild(item);
			}
		};
		
		populate(100);
		
		this.tick = function() {
			globalScaleStageCenter = scaleStage.localToGlobal(0, 0);
			direction = PTUtils.angleRadians(trackingStage.getAmountToMove(), new Point() );

			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var globalItemCenter = item.localToGlobal(0, 0);
				var localItemPos = scaleStage.globalToLocal(globalItemCenter.x, globalItemCenter.y);
				// if (i === 0) { console.log("localItemPos: " + localItemPos); }
				var distanceFromCenter = PTUtils.distance(localItemPos, new Point());
				if ( distanceFromCenter > wrapRadius ) {
					var localScaleStageCenter = that.globalToLocal(globalScaleStageCenter.x, globalScaleStageCenter.y);
					var respawnAngleRadians = PTUtils.getOppositeAngleRadians(direction);
					var respawnPoint = PTUtils.polarRadians(wrapRadius, respawnAngleRadians);
					item.x = localScaleStageCenter.x + respawnPoint.x;
					item.y = localScaleStageCenter.y + respawnPoint.y;
				}
			}

			// _.each(items, function(item) {
			// 		var globalItemCenter = item.localToGlobal(0, 0);
			// 		var distanceFromCenter = PTUtils.distance(globalItemCenter, globalScaleStageCenter);
			// 		if ( distanceFromCenter > wrapRadius ) {
			// 			var localScaleStageCenter = that.globalToLocal(globalScaleStageCenter.x, globalScaleStageCenter.y);
			// 			var respawnAngleRadians = PTUtils.getOppositeAngleRadians(direction);
			// 			var respawnPoint = PTUtils.polarRadians(wrapRadius, respawnAngleRadians);
			// 			item.x = localScaleStageCenter.x + respawnPoint.x;
			// 			item.y = localScaleStageCenter.y + respawnPoint.y;
			// 		}
			// });
		};
	};

	window.ItemScroller = ItemScroller;	

}(window));