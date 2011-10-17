(function(window){
	
	var Jargle = function() {
		this.initialize();
	};
	
	Jargle.prototype = new Fargle();
	
	var p = Jargle.prototype;
	
	Jargle_initialize = p.initialize;
	
	p.initialize = function() {
		Jargle_initialize();
		this.superAddPewpie = this.addPewpie;
		
		this.addPewpie = function(poopoo) {
			this.superAddPewpie("jargle" + poopoo);
		};
	};
	
window.Jargle = Jargle;
}(window));