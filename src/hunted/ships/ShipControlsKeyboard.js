(function(window){
	
	var ShipControlsKeyboard = function() {
		
		var that = this;

		var upHeld, downHeld, leftHeld, rightHeld, spaceHeld, shiftHeld;
		upHeld = downHeld = leftHeld = rightHeld = spaceHeld = shiftHeld = false;

		this.throttle = 0;
		this.steering = 0;
		this.boost = false;
		this.launch = false;

		bindKeys();

		function bindKeys() {
			$(document).bind('keydown', 'left',function (){ leftHeld = true; });
			$(document).bind('keydown', 'right',function (){ rightHeld = true; });
			$(document).bind('keydown', 'up',function (){ upHeld = true; });
			$(document).bind('keydown', 'down',function (){ downHeld = true; });
			$(document).bind('keydown', 'space',function (){ spaceHeld = true; });
			$(document).bind('keydown', 'shift',function (){ shiftHeld = true; });

			$(document).bind('keyup', 'left',function (){ leftHeld = false; });
			$(document).bind('keyup', 'right',function (){ rightHeld = false; });
			$(document).bind('keyup', 'up',function (){ upHeld = false; });
			$(document).bind('keyup', 'down',function (){ downHeld = false; });
			$(document).bind('keyup', 'space',function (){ spaceHeld = false; });
			$(document).bind('keyup', 'shift',function (){ shiftHeld = false; });
		}

		this.update = function () {

			setThrottle();
			setSteering();
			setBoost();
			setFire();

			function setThrottle() {
				if (upHeld && !downHeld) {
					that.throttle = 1;
				} else if (downHeld && !upHeld) {
					that.throttle = -0.5;
				} else {
					that.throttle = 0;
				}
			}

			function setSteering() {
				if (leftHeld && !rightHeld) {
					that.steering = -1;
				} else if (rightHeld && !leftHeld) {
					that.steering = 1;
				} else {
					that.steering = 0;
				}
			}

			function setBoost() {
				that.boost = shiftHeld ? true : false;
			}
			
			function setFire() {
				that.launch = spaceHeld ? true : false;
			}
		};

	};
		
	window.ShipControlsKeyboard = ShipControlsKeyboard;

}(window));