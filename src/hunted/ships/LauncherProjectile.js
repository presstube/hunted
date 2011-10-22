(function(window){
	
	var LauncherProjectile = function(props) { this.initialize(props); };
	var p = LauncherProjectile.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize(); 
		
		var _p = this.props = props || {},
			liveCount = 0,
			skin = PTUtils.makeTriangle('#ff0', 5, 5);

		this.force = new Force(this);
		
		this.tick = function() {
			this.force.update();
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
		
		// this.fire = function() {
		// 	this.addForce(_p.ship.getForce());
		// 	var adjProjThrust = _p.projectileThrust - (Math.random()*(_p.projectileThrust/4));
		// 	this.addForce(PTUtils.polarDegrees(adjProjThrust, this.rotation));
		// };

		this.addChild(skin);
		
	};

	window.LauncherProjectile = LauncherProjectile;

}(window));