(function(window){
	
	var LauncherPeePants = function(props) { this.initialize(props); };
	var p = LauncherPeePants.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize();
		
		var that = this,
			_p = this.props = props || {},
			skin = PTUtils.makeTriangle('#fff', 5, 5);

			_p.projectileLimit = _p.projectileLimit || 10;

		var spread = 5;
		var ammoLifeSpan = 1000;
		
		this.addChild(skin);
		
		this.launch = function() {
			_.times(5, fire);
			// fire();
		};

		function fire() {
			if (_p.app.getProjectiles().length < _p.projectileLimit) {
				// that.rotation = 90;
				that.rotation = Math.random()*spread - Math.random()*spread;
				var projectile = that.makeProjectile();
				var launchPos = that.localToLocal(0, 0, _p.ship.parent);
				projectile.rotation = _p.ship.rotation + that.rotation;
				projectile.x = launchPos.x;
				projectile.y = launchPos.y;
				_p.trackingStage.addChildAt(projectile, _p.trackingStage.getChildIndex(_p.ship));
				projectile.addForce(_p.ship.getForce());
				var adjProjThrust = _p.projectileThrust - (Math.random()*(_p.projectileThrust/4));
				projectile.addForce(PTUtils.polarDegrees(adjProjThrust, _p.ship.rotation + that.rotation));
				skin.y = +5;
				_p.app.getProjectiles().push(projectile);
				_.delay(killProjectile, ammoLifeSpan, projectile);
				// that.rotation = 0;
			}
			
		}

		// exposing this as a kind of ammo factory that can be overwritten from outside
		function makeProjectile() {

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
				var dpForceAbility = new ForceAbility({app: _p.app, target: dp});
				dp.tick = function() { dpForceAbility.update(); };

				return dp;
			}
			
			// return makeShipProjectile();
			return makeDumbProjectile();
			
		}
		
		this.makeProjectile = makeProjectile;

		function killProjectile(projectile) {
			_p.trackingStage.removeChild(projectile);
			_p.app.getProjectiles().splice(_.indexOf(_p.app.getProjectiles(), projectile), 1);
			// console.log("killing projectile");
		}

		
		this.tick = function() {
			skin.y += (0 - skin.y) / 2;
		};
	};

	window.LauncherPeePants = LauncherPeePants;

}(window));