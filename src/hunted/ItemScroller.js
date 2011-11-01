(function(window) {

	/*
		props { 
			app: app,
			numItems: numItems, 
			wrapRadius: wrapRadius
		}
	*/

	var ItemScroller = function(props) {this.initialize(props);};
	var p = ItemScroller.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		
		this.Container_initialize();
		
		var itemScroller = this,
			app = props.app,
			wrapRadius = props.wrapRadius ? props.wrapRadius : 300,
			numItems = props.numItems ? props.numItems : 60,
			globalScaleStageCenter = new Point(),
			direction = 0,
			items = [];

		var populate = function() {

			for (var i = 0; i < numItems; i++) {
				makeItem();
			}
			
			function makeItem() {
				var item,
					spawnPoint = PTUtils.polarDegrees(((Math.random()*(wrapRadius-500)))+500, Math.random() * 360);

				item = new GravityWellRepelBubble({app: app});
				item.x = spawnPoint.x;
				item.y = spawnPoint.y;
				items.push(item);
				itemScroller.addChild(item);
			}
		};
		
		populate();
		
		this.tick = function() {
			
			globalScaleStageCenter = app.scaleStage.localToGlobal(0, 0);
			direction = PTUtils.angleRadians(app.trackingStage.getAmountToMove(), new Point() );

			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var globalItemCenter = item.localToGlobal(0, 0);
				var localItemPos = app.scaleStage.globalToLocal(globalItemCenter.x, globalItemCenter.y);
				var distanceFromCenter = PTUtils.distance(localItemPos, new Point());
				if ( distanceFromCenter > wrapRadius ) {
					var localScaleStageCenter = itemScroller.globalToLocal(globalScaleStageCenter.x, globalScaleStageCenter.y);
					var respawnAngleRadians = PTUtils.getOppositeAngleRadians(direction);
					var respawnPoint = PTUtils.polarRadians(wrapRadius, respawnAngleRadians);
					item.x = localScaleStageCenter.x + respawnPoint.x;
					item.y = localScaleStageCenter.y + respawnPoint.y;
				}
			}
		};
	};

	window.ItemScroller = ItemScroller;	

}(window));