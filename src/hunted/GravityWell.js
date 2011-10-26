(function(window){
	
	var GravityWell = function() {this.initialize();};
	var p = GravityWell.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function() {
		ths.Container_initialize();

		
	};

	window.GravityWell = GravityWell;

}(window));