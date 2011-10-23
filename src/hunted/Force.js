(function(window){
	
	var Force = function(target) {

		var force = new Point();

		var _p = target.props;
		_p.drag = _p.drag ? _p.drag : 0.95;

		function applyForce() {
			target.x += force.x;
			target.y += force.y;
		}
		
		function applyDrag() {
			force.x *= _p.drag;
			force.y *= _p.drag;
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

	window.Force = Force;

}(window));