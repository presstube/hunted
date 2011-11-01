(function(window){
	
	var Fargle = function() {
		this.initialize();
	};
	
	Fargle.prototype = new Object();
	
	var p = Fargle.prototype;
	
	p.initialize = function() {
		var pewpie = [];
		this.addPewpie = function(poopoo) {
			pewpie.push(poopoo);
		};
		this.getPewpie = function(){return pewpie;};
		
		this.fudge = [];
	};
	
window.Fargle = Fargle;
}(window));