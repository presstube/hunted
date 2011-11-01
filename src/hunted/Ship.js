(function(window) {

	/*
		props {												/// these comments should show ranges if they apply	
				app: app,
				name: "hero",
				controlsClass: ShipControlsKeyboard,
				skinClass: ShipSkinGeneric,
				engineClass: ShipEngineGeneric,

				// for the engine
				thrustLimit: 2,
				
				// for the booster
				boostThrust: 5,
				boostFuelLimit: boostFuelLimit,
				boostRegenerateFrequency: 4,

				// for the steering
				steeringResponse: 2,
				steeringLimit: 10,

				// for the gun
				launcherSpread: 5,
				projectileThrust: 40,
				shotsPerLaunch: 1,
				projectileLife: 20,
				projectileLimit: 200,

				// for the heatseeker
				targetFunc: nav.getTarget
				// trackingStage: trackingStage,
				// projectiles: projectiles
		}
	*/

	var Ship = function(props) { this.initialize(props); };
	var p = Ship.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {

		var app = props.app;

		if (props) {

			this.Container_initialize();
			
			this.props = props;
			this.props.ship = this;
			
			this.forceAbility = new ForceAbility({app: app, target: this});
			this.makeControls();
			this.makeEngine();
			this.makeSkin();
			
		}
	};

	p.tick = function() {
		this.controls.update();
		this.engine.update();
		this.forceAbility.update();
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