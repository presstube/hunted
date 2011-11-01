//(function(window){
//	
//	var PrivateTest = function() {
//		var rand = Math.random();
//		console.log("rand: " + rand);
//		this.getRand = function() { return rand; };
//	};
//	
//
//window.PrivateTest = PrivateTest;
//}(window));
//
//window.p1 = new PrivateTest();
//window.p2 = new PrivateTest();
//
//console.log("p1.getRand() " + p1.getRand());
//console.log("p1.getRand() " + p2.getRand());



(function(window){
	var Class1 = function(props) { this.initialize(props); };
	var p = Class1.prototype = new Container();
	p.Container_initialize = p.initialize;
	p.initialize = function(props) {
		this.Container_initialize();
		this.props = props || {};
		var name = props.name,
			class2 = new Class2(props);
		this.getName = function() { return name; };
		this.getClass2 = function() { return class2; };
	};
window.Class1 = Class1;
}(window));

(function(window){
	var Class2 = function(props) { this.initialize(props); };
	var p = Class2.prototype = new Container();
	p.Container_initialize = p.initialize;
	p.initialize = function(props) {
		this.Container_initialize();
		this.props = props || {};
		var name = props.name,
			class3 = new Class3(props);
		this.getName = function() { return name; };
		this.getClass3 = function() { return class3; };
	};
	window.Class2 = Class2;
}(window));

(function(window){
	var Class3 = function(props) { this.initialize(props); };
	var p = Class3.prototype = new Container();
	p.Container_initialize = p.initialize;
	p.initialize = function(props) {
		this.Container_initialize();
		this.props = props || {};
		var name = props.name;
		this.getName = function() { return name; };
	};
	window.Class3 = Class3;
}(window));

var class1a = new Class1({name: "AAA"});
var class1b = new Class1({name: "BBB"});



(function(window){
	var Class3 = function(props) { this.initialize(props); };
	var p = Class3.prototype = new Container();
	p.Container_initialize = p.initialize;
	p.initialize = function(props) {
		this.Container_initialize();
		this.props = props || {};
		var name = props.name;
		this.getName = function() { return name; };
	};
	window.Class3 = Class3;
}(window));


(function(window){
	
	var ShipSkinGeneric2 = function(props) { this.initialize(props); };
	var p = ShipSkinGeneric2.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize();
		
		this.props = props || {};
		
		var tail = new Container(),
			stunky = Math.random();
			
//		this.exhaustPipe = new ExhaustPipe(this.props);
			
		this.getName = function() { return name; };
		this.getStunky = function() { return stunky; };
	};

window.ShipSkinGeneric2 = ShipSkinGeneric2;
}(window));

var ss1 = new ShipSkinGeneric2({});
var ss2 = new ShipSkinGeneric2({});
