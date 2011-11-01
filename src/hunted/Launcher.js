(function(window){

	/*
		props { 
			app: app
			ship: the current ship, not the one in HuntedApp.. infact that should be changed to player or something.
			projectileLimit: projectileLimit,
			projectileThrust: projectileThrust 
		}
	*/
	
	var Launcher = function(props) { this.initialize(props); };
	var p = Launcher.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {

		this.Container_initialize();
		
		var _p = this.props = props || {},
			app = _p.app,
			skin = PTUtils.makeTriangle('#fff', 5, 5);

			_p.projectileLimit = _p.projectileLimit || 10;
		
		this.addChild(skin);
		
		this.launch = function() {
			if (app.projectiles.length < _p.projectileLimit) {

				var projectile = this.makeProjectile(),
					launchPos = this.localToLocal(0, 0, _p.ship.parent),
					adjProjThrust = _p.projectileThrust - (Math.random()*(_p.projectileThrust/4));

				projectile.rotation = _p.ship.rotation + this.rotation;
				projectile.x = launchPos.x;
				projectile.y = launchPos.y;
				app.trackingStage.addChildAt(projectile, app.trackingStage.getChildIndex(_p.ship));
				projectile.addForce(_p.ship.getForce());
				projectile.addForce(PTUtils.polarDegrees(adjProjThrust, projectile.rotation));
				skin.y = +5;
				app.projectiles.push(projectile);
				_.delay(killProjectile, 500, projectile);
			}
		};

		// wire any factory or constructor into this as long as the object it produces has ForceAbility
		// What about this can be 
		this.makeProjectile = function() {

			function makeShipProjectile() {
				var ship = new Ship({
					thrustLimit: 5,
					steeringResponse: 1,
					steeringLimit: 20,
					shipSkin: ShipSkinGoon,
					controlsClass: ShipControlsAIChaseDynamic,
					targetFunc: _p.targetFunc,
					target: _p.ship
				});
				ship.scaleX = ship.scaleY = 0.5;
				return ship;
			}

			function makeDumbProjectile() {
				var dp = PTUtils.makeTriangle('#ff0', 5, 5);
				var dpForceAbility = new ForceAbility({app: app, target: dp});
				dp.tick = function() { dpForceAbility.update(); };

				return dp;
			}
			
			// return makeShipProjectile();
			return makeDumbProjectile();
			
		};

		function killProjectile(projectile) {
			app.trackingStage.removeChild(projectile);
			app.projectiles.splice(_.indexOf(app.projectiles, projectile), 1);
			// console.log("killing projectile");
		}

		
		this.tick = function() {
			skin.y += (0 - skin.y) / 2;
		};
	};

	window.Launcher = Launcher;

}(window));