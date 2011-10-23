(function(window){
	
	var ForceAbility = function(target) {

		target.isForceable = true;

		var force = new Point();

		var _p = target.props;

		function applyForce() {
			target.x += force.x;
			target.y += force.y;
		}
		
		function applyDrag() {
			force.x *= Global.drag;
			force.y *=Global.drag;
		}

		this.update = function() {
			applyForce();
			applyDrag();
		};

		target.addForce = function(forceToAdd) {
			force.x += forceToAdd.x;
			force.y += forceToAdd.y;
		};

		target.getForce = function() {
			return force;
		};

	};

	window.ForceAbility = ForceAbility;

}(window));