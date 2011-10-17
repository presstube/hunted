(function(window){
	
	var ExhaustParticle = function(props) { this.initialize(props); };
	var p = ExhaustParticle.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize();
		
		var exhaustPipe = props.exhaustPipe,
			ship = props.ship,
			exhaustPipeGlobal = exhaustPipe.localToGlobal(0,0),
			shipParentLocal = ship.parent.globalToLocal(
				exhaustPipeGlobal.x, 
				exhaustPipeGlobal.y
			),
			skin = PTUtils.makeTriangle('fff', 4, 4);
		
		skin.rotation = 180;
		this.addChild(skin);

		this.x = shipParentLocal.x;
		this.y = shipParentLocal.y;
		this.rotation = ship.rotation;
		
		this.tick = function() {
			this.alpha -= .05;
			if (this.alpha < 0) {
				this.parent.removeChild(this);
				this.tick = null;
			}
		};
		ship.parent.addChildAt(this, ship.parent.getChildIndex(ship));
	};
	window.ExhaustParticle = ExhaustParticle;

}(window));