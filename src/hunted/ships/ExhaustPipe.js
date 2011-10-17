(function(window){
	
	var ExhaustPipe = function(props) {this.initialize(props);};
	var p = ExhaustPipe.prototype = new Container();
	p.Container_initialize = p.initialize;
		
	p.initialize = function(props) {
		
		this.Container_initialize();
		
		this.props = props || {};
		
		var ship = props.ship,
			engaged = false,
			frequency = 5,
			index = 0,
			skin = PTUtils.makeTriangle('#fff', 6, 6);
		
	//	skin.rotation = 180;
		this.addChild(skin);
		
		this.engage = function() {
			index = frequency;
			this.tick = function() {
				if (index % frequency === 0) {
					new ExhaustParticle({
						exhaustPipe : this,
						ship : ship
					});
				}
				index++;
			};
			engaged = true;
		};
		
		this.disengage = function() {
			this.tick = null;
			engaged = false;
		};
		
		this.isEngaged = function(){
			return engaged;
		};
	};
		
	window.ExhaustPipe = ExhaustPipe;

}(window));