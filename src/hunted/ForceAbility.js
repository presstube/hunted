(function(window){

	/*
		props { 
			app: app
			target: DisplayObject, 
			drag: Number 
		}
	*/
	
	var ForceAbility = function(props) {

		var app = props.app,
			target = props.target;

		target.isForceable = true;

		var force = new Point();

		function applyForce() {
			target.x += force.x;
			target.y += force.y;
		}
		
		function applyDrag() {
			force.x *= app.drag;
			force.y *= app.drag;
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