(function(window){
	
	var LauncherHeatSeeker = function(props) { this.initialize(props); };
	var p = LauncherHeatSeeker.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize();
		
		var _p = this.props = props || {},
			skin = PTUtils.makeTriangle('#fff', 5, 5);

			_p.projectileLimit = _p.projectileLimit || 10;
		
		this.addChild(skin);
		
		this.launch = function() {
			if (_p.projectiles.length < _p.projectileLimit) {
				var projectile = this.makeProjectile();
				var launchPos = this.localToLocal(0, 0, _p.ship.parent);
				projectile.rotation = _p.ship.rotation + this.rotation;
				projectile.x = launchPos.x;
				projectile.y = launchPos.y;
				_p.trackingStage.addChildAt(projectile, _p.trackingStage.getChildIndex(_p.ship));
				projectile.addForce(_p.ship.getForce());
				var adjProjThrust = _p.projectileThrust - (Math.random()*(_p.projectileThrust/4));
				projectile.addForce(PTUtils.polarDegrees(adjProjThrust, projectile.rotation));
				skin.y = +5;
				_p.projectiles.push(projectile);
				_.delay(killProjectile, 3000, projectile);
			}
		};

		// exposing this as a kind of ammo factory that can be overwritten from outside
		this.makeProjectile = function() {

			function makeShipProjectile() {
				var ship = new Ship({
					thrustLimit: 2,
					steeringResponse: 1,
					steeringLimit: 20,
					shipSkin: ShipSkinGoon,
					controlsClass: ShipControlsAIChaseDynamic,
					targetFunc: _p.targetFunc,
					target: _p.ship
				});
				ship.scaleX = ship.scaleY = 0.2;
				return ship;
			}

			function makeDumbProjectile() {
				var dp = PTUtils.makeTriangle('#ff0', 5, 5);
				var dpForceAbility = new ForceAbility(dp);
				dp.tick = function() { dpForceAbility.update(); };

				return dp;
			}
			
			return makeShipProjectile();
			// return makeDumbProjectile();
			
		};

		function killProjectile(projectile) {
			_p.trackingStage.removeChild(projectile);
			_p.projectiles.splice(_.indexOf(_p.projectiles, projectile), 1);
			// console.log("killing projectile");
		}

		
		this.tick = function() {
			skin.y += (0 - skin.y) / 2;
		};
	};

	window.LauncherHeatSeeker = LauncherHeatSeeker;

}(window));