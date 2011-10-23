(function(window){
	
	var ParallaxScroller = function(props) {this.initialize(props);};
	var p = ParallaxScroller.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		
		this.Container_initialize();

		var that = this,
			_p = this.props = props || {}, // shortcut & expose props
			direction = 0;
		
		// defaults
		_p.numItems = _p.numItems || 30;
		_p.wrapRadius = _p.wrapRadius || 300;

		function populate() {
			
			var makeItem = function(i) {

				var minScale = 0.5, 
					maxScale = 3,
					item = new Container();
					// item = PTUtils.makeTriangle('#666', 100, 100);
				
				item.multiplier = i / _p.numItems;

				var bigTriangle = PTUtils.makeTriangle('#666', 100, 100);
				var smallTriangle = PTUtils.makeTriangle('#777', 20, 20);
				bigTriangle.y = 100;
				smallTriangle.y = 20;
				item.addChild(bigTriangle);
				item.addChild(smallTriangle);
				var thisScale = ((maxScale - minScale) * item.multiplier) + minScale;
				var	spawnPoint = PTUtils.polarDegrees(Math.random() * _p.wrapRadius, Math.random()*360);
				item.alpha = 0.5 * item.multiplier;
				item.rotation = Math.random()*360;
				item.x = spawnPoint.x; item.y = spawnPoint.y;
				item.scaleX = thisScale; item.scaleY = thisScale;
				item.i = i;
				_p.nav.registerNavItem(item);
				that.addChild(item);



				item.tick = function() {

					this.x += _p.trackingStage.getAmountToMove().x * this.multiplier;
					this.y += _p.trackingStage.getAmountToMove().y * this.multiplier;
					var distanceFromCenter = PTUtils.distance(new Point(this.x, this.y), new Point());
					if (distanceFromCenter > _p.wrapRadius) {
						var respawnAngleRadians = PTUtils.getOppositeAngleRadians(direction);
						var respawnPoint = PTUtils.polarRadians(_p.wrapRadius, respawnAngleRadians);
						this.x = respawnPoint.x;
						this.y = respawnPoint.y;
					}
					
				};
			};

			_.times(_p.numItems, makeItem);

		}
		
		populate();
		
		this.tick = function() {
			direction = PTUtils.angleRadians(_p.trackingStage.getAmountToMove(), new Point());
		};
	};

	window.ParallaxScroller = ParallaxScroller;

}(window));






















// closest chaser system

// this.closestChaser;
// var locateClosestChaser = function() {
//	var closestDist = 999999999, 
//		chaserDist,
//		shipPoint = new Point(ship.x, ship.y);
//	_.each(chasers, function(chaser){ 
//		chaserDist = PTUtils.distance(new Point(chaser.x, chaser.y), shipPoint);
//		if (chaserDist < closestDist) {
//			closestDist = chaserDist;
//			that.closestChaser = chaser;
//		}
//	});
// };

//				var closestChaser;
//				try {
//					closestChaser = props.app.closestChaser;
//					var itemGlobalPos = this.localToGlobal(0, 0);
//					var closestChaserGlobalPos = closestChaser.localToGlobal(0, 0);
//					var dirToClosestChaser = PTUtils.angleDegrees(itemGlobalPos, closestChaserGlobalPos);
//				} catch (e) {
//					console.log("error: " + e);
//				} finally {
//				
//				}
//				console.log("closestChaser: " + closestChaser);
//				
//				item.rotation = dirToClosestChaser;