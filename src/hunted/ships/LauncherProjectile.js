(function(window){
	
	var LauncherProjectile = function(props) { this.initialize(props); };
	var p = LauncherProjectile.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize(); 
		
		var _p = this.props = props || {},
			vX = 0,
			vY = 0,
			liveCount = 0,
			skin = PTUtils.makeTriangle('#ff0', 5, 5);

		this.addForce = function(force) {
			vX += force.x; vY += force.y;
		};
		
		this.applyForce = function() {
			this.x += vX; this.y += vY;
		};
		
		this.applyDrag = function() {
			vX *= _p.drag; vY *= _p.drag;
		};
		
		this.tick = function() {
			this.applyForce();
			this.applyDrag();
			liveCount++;
			if (liveCount == _p.projectileLife) {
				this.parent.removeChild(this);
				var projectiles = this.props.projectiles;
				for(var i = 0; i < projectiles.length; i++) { 
					if (this === projectiles[i]) {
						projectiles.splice(i, 1);
						break;
					}
				}
				
			}
		};
		
		this.fire = function() {
			this.addForce(_p.ship.engine.getVelocity());
			var adjProjThrust = _p.projectileThrust - (Math.random()*(_p.projectileThrust/4));
			// this.addForce(PTUtils.polarDegrees(_p.projectileThrust, this.rotation));
			this.addForce(PTUtils.polarDegrees(adjProjThrust, this.rotation));
		};

		this.addChild(skin);
		
	};

	window.LauncherProjectile = LauncherProjectile;

}(window));