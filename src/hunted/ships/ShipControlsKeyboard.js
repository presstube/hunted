(function(window){
	
	var ShipControlsKeyboard = function() {
		
		var upHeld, downHeld, leftHeld, rightHeld, spaceHeld, shiftHeld;
		upHeld = downHeld = leftHeld = rightHeld = spaceHeld = shiftHeld = false;

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
		
		return {
			
			throttle: 0,
			steering: 0,
			boost: false,
			launch: false,
			
			update: function() {

				if (upHeld && !downHeld) {
					this.throttle = 1;
				} else if (downHeld && !upHeld) {
					this.throttle = -0.5;
				} else {
					this.throttle = 0;
				}
				
				if (leftHeld && !rightHeld) {
					this.steering = -1;
				} else if (rightHeld && !leftHeld) {
					this.steering = 1;
				} else {
					this.steering = 0;
				}
				
				if (shiftHeld) {
					this.boost = true;
				}
				
				if (spaceHeld) {
					this.launch = true;
				}
				
			}	
		};
	};
		
	window.ShipControlsKeyboard = ShipControlsKeyboard;

}(window));