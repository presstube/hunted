(function(window) {

	var KeyboardInput = function() {

		var that = this;

		this.shiftHeld = false;
		this.spaceHeld = false;
		this.upHeld = false;
		this.downHeld = false;
		this.leftHeld = false;
		this.rightHeld = false;
		this.bHeld = false;

		$(document).bind('keydown', 'left',function (){ that.leftHeld = true; });
		$(document).bind('keydown', 'right',function (){ that.rightHeld = true; });
		$(document).bind('keydown', 'up',function (){ that.upHeld = true; });
		$(document).bind('keydown', 'down',function (){ that.downHeld = true; });
		$(document).bind('keydown', 'space',function (){ that.spaceHeld = true; });
		$(document).bind('keydown', 'shift',function (){ that.shiftHeld = true; });
		// $(document).bind('keydown', 'b',function (){ that.bHeld = true; });

		$(document).bind('keyup', 'left',function (){ that.leftHeld = false; });
		$(document).bind('keyup', 'right',function (){ that.rightHeld = false; });
		$(document).bind('keyup', 'up',function (){ that.upHeld = false; });
		$(document).bind('keyup', 'down',function (){ that.downHeld = false; });
		$(document).bind('keyup', 'space',function (){ that.spaceHeld = false; });
		$(document).bind('keyup', 'shift',function (){ that.shiftHeld = false; });
		// $(document).bind('keyup', 'b',function (){ that.bHeld = false; });

	};

	var p = KeyboardInput.prototype = {};

	p.toString = function() {
		return "[KeyboardInput (name="+  this.name +")]";
	};

	window.KeyboardInput = KeyboardInput;
	
}(window));