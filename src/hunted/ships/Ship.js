(function(window) {

	var Ship = function(props) { this.initialize(props); };
	var p = Ship.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		if (props) {
			this.Container_initialize();
			
			this.props = props;
			this.props.ship = this;
			
			this.makeControls();
			this.makeEngine();
			this.makeSkin();
		}
	};

	p.tick = function() {
		this.controls.update();
		this.engine.update();
		this.skin.update();
	};

	p.makeControls = function() {
		this.controls = new this.props.controlsClass(this.props);
	};

	p.makeEngine = function() {
		if ( this.props.engineClass){
			this.engine = new this.props.engineClass(this.props);
		} else {
			this.engine = new ShipEngineGeneric(this.props);
		}
	};

	p.makeSkin = function() {
		if ( this.props.skinClass){
			this.skin = new this.props.skinClass(this.props);
		} else {
			this.skin = new ShipSkinGeneric(this.props);
		}
		this.addChild(this.skin);
	};

	p.kill = function() {
		this.parent.removeChild(this);
	};

	p.toString = function() {
		return "[Ship (name="+  this.name +")]";
	};

	window.Ship = Ship;

}(window));