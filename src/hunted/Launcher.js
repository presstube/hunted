(function(window){
	
	var Launcher = function(props) { this.initialize(props); };
	var p = Launcher.prototype = new Container();
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
				// var projectile = new LauncherProjectile(props);
				var launchPos = this.localToLocal(0, 0, _p.ship.parent);
				projectile.rotation = _p.ship.rotation + this.rotation;
				projectile.x = launchPos.x;
				projectile.y = launchPos.y;
				_p.ship.parent.addChildAt(projectile, _p.ship.parent.getChildIndex(_p.ship));
				// projectile.fire();
				projectile.addForce(_p.ship.getForce());
				var adjProjThrust = _p.projectileThrust - (Math.random()*(_p.projectileThrust/4));
				// projectile.addForce(PTUtils.polarDegrees(_p.projectileThrust, projectile.rotation));
				projectile.addForce(PTUtils.polarDegrees(adjProjThrust, projectile.rotation));
				skin.y = +5;
				_p.projectiles.push(projectile);
			}
		};
		
		this.tick = function() {
			skin.y += (0 - skin.y) / 2;
		};

		// exposing this as a kind of ammo factory that can be overwritten from outside
		this.makeProjectile = function() {
			// return new LauncherProjectile(props);
			var ship = new Ship({
				thrustLimit: 3,
				shipSkin: ShipSkinGoon,
				controlsClass: ShipControlsAIChase,
				target: _p.ship
			});
			ship.scaleX = ship.scaleY = 0.5;
			return ship;
		};
	};

	window.Launcher = Launcher;

}(window));