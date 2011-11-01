(function(window) {
	
var InheritanceTest = function() {
	
	this.lala = new Lala();
	this.lolo = new Lolo();
	
};

var Lala = function() {
	
	var _pee = "peepeeppeeeee!",
		_poo = "poopoopoopoopoopoo!";
	
	this.getPee = function(){return _pee;};
	this.setPee = function(pee) {_pee = pee;};
	this.getPoo = function() {return _poo;};
	this.setPoo = function(poo) {_poo = poo;};
	
};
Lala.prototype = new Object();

var Lolo = function() {
	
	var _sweej = "swaaaaaalj";
	
	this.getSweej = function() {return _sweej;};
	this.setSweej = function(sweej) {_sweej = sweej;};
	
};
Lolo.prototype = new Lala();

window.InheritanceTest = InheritanceTest;	
}(window));
