(function(window){

	/*
		props { 
			host: host 
		}
	*/
	
	var ExhaustPipe = function(props) {this.initialize(props);};
	var p = ExhaustPipe.prototype = new Container();
	p.Container_initialize = p.initialize;
		
	p.initialize = function(props) {
		
		this.Container_initialize();
		
		var host = props.host,
			engaged = false,
			frequency = 5,
			index = 0,
			skin = PTUtils.makeTriangle('#fff', 6, 6);
		
		this.addChild(skin);
		
		this.engage = function() {
			index = frequency;
			this.tick = function() {
				if (index % frequency === 0) {
					new ExhaustParticle({
						exhaustPipe: this,
						host: host
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