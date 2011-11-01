(function(window){

	/*
		props { 
			exhaustPipe: this, 
			host: host 
		}
	*/
	
	var ExhaustParticle = function(props) { this.initialize(props); };
	var p = ExhaustParticle.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize();
		
		var exhaustPipe = props.exhaustPipe,
			host = props.host,
			exhaustPipeGlobal = exhaustPipe.localToGlobal(0,0),
			hostParentLocal = host.parent.globalToLocal( exhaustPipeGlobal.x, exhaustPipeGlobal.y ),
			skin = PTUtils.makeTriangle('fff', 4, 4);
		
		skin.rotation = 180;
		this.addChild(skin);
		this.x = hostParentLocal.x;
		this.y = hostParentLocal.y;
		this.rotation = host.rotation; // would be better if it got the concatenated rotation of the exhaustPipe not the host
		host.parent.addChildAt(this, host.parent.getChildIndex(host));
		
		this.tick = function() {
			this.alpha -= 0.05;
			if (this.alpha < 0) {
				this.parent.removeChild(this);
				this.tick = null;
			}
		};
	};

	window.ExhaustParticle = ExhaustParticle;

}(window));