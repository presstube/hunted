(function(window){

	/*
		props { 
			app: app,
			numItems: numItems.
			wrapRadius: wrapRadius,
			nav: nav
		}
	*/
	
	var ParallaxScroller = function(props) {this.initialize(props);};
	var p = ParallaxScroller.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		
		this.Container_initialize();

		var parallaxScroller = this,
			_p = this.props = props || {}, // shortcut & expose props
			app = props.app,
			direction = 0;
		
		// defaults
		_p.numItems = _p.numItems || 30;
		_p.wrapRadius = _p.wrapRadius || 300;

		function populate() {
			
			var makeItem = function(i) {

				var minScale = 0.5, 
					maxScale = 3,
					item = new Container(),
					bigTriangle = PTUtils.makeTriangle('#666', 100, 100),
					smallTriangle = PTUtils.makeTriangle('#777', 20, 20),
					spawnPoint = PTUtils.polarDegrees(Math.random() * _p.wrapRadius, Math.random()*360);

				
				item.multiplier = i / _p.numItems;
				bigTriangle.y = 100;
				smallTriangle.y = 20;
				item.addChild(bigTriangle);
				item.addChild(smallTriangle);
				var thisScale = ((maxScale - minScale) * item.multiplier) + minScale;
				item.alpha = 0.5 * item.multiplier;
				item.rotation = Math.random()*360;
				item.x = spawnPoint.x; item.y = spawnPoint.y;
				item.scaleX = thisScale; item.scaleY = thisScale;
				item.i = i;
				_p.nav.registerNavItem(item);
				parallaxScroller.addChild(item);



				item.tick = function() {

					this.x += app.trackingStage.getAmountToMove().x * this.multiplier;
					this.y += app.trackingStage.getAmountToMove().y * this.multiplier;
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
			direction = PTUtils.angleRadians(app.trackingStage.getAmountToMove(), new Point());
		};
	};

	window.ParallaxScroller = ParallaxScroller;

}(window));