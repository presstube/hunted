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
				var projectile = new LauncherProjectile(props);
				var launchPos = this.localToLocal(0, 0, _p.ship.parent);
				projectile.rotation = _p.ship.rotation + this.rotation;
				projectile.x = launchPos.x;
				projectile.y = launchPos.y;
				_p.ship.parent.addChildAt(projectile, _p.ship.parent.getChildIndex(_p.ship));
				projectile.fire();
				skin.y = +5;
				_p.projectiles.push(projectile);
			}
		};
		
		this.tick = function() {
			skin.y += (0 - skin.y) / 2;
		};
	};

	window.Launcher = Launcher;

}(window));