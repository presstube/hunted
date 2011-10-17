(function(window) {

	var KeyboardInput = function() {
		// var that = this;
		// this.name = Math.random();
		// document.onkeydown = function(e) { that.handleKeyDown(e); };
		// document.onkeyup = function(e) { that.handleKeyUp(e); };
		_.extend(this, Backbone.Events);

		$(document).bind('keydown', 'left',function (){ 
			this.leftHeld = true; 
			// console.log("shiftHeld: " + this.shiftHeld);
			// console.log("this.leftHeld: " + this.leftHeld);

		});
		$(document).bind('keydown', 'right',function (){ this.rightHeld = true; });
		$(document).bind('keydown', 'up',function (){ this.upHeld = true; });
		$(document).bind('keydown', 'down',function (){ this.downHeld = true; });
		$(document).bind('keydown', 'space',function (){ 
			this.spaceHeld = true; 
			// console.log("spaceHeld: " + this.spaceHeld);
			// console.log("this.leftHeld: " + this.leftHeld);
		});
		$(document).bind('keydown', 'shift',function (){ this.shiftHeld = true; });

		$(document).bind('keyup', 'left',function (){ this.leftHeld = false; });
		$(document).bind('keyup', 'right',function (){ this.rightHeld = false; });
		$(document).bind('keyup', 'up',function (){ this.upHeld = false; });
		$(document).bind('keyup', 'down',function (){ this.downHeld = false; });
		$(document).bind('keyup', 'space',function (){ this.spaceHeld = false; });
		$(document).bind('keyup', 'shift',function (){ this.shiftHeld = false; });

		$(document).bind('keyup', 'a',function (){ console.log("A PRESSED"); });





	};

	var p = KeyboardInput.prototype = {};

	p.shiftHeld = false;
	p.spaceHeld = false;
	p.upHeld = false;
	p.downHeld = false;
	p.leftHeld = false;
	p.rightHeld = false;

	p.toString = function() {
		return "[KeyboardInput (name="+  this.name +")]";
	};

	// p.handleKeyDown = function(e) {
	// 	if(!e){ var e = window.event; }
	// //	console.log("KEYDOWN: " + e.keyCode, this.name);
	// 	switch(e.keyCode) {
	// 		case KeyboardInput.KEYCODE_SHIFT: 
	// 			this.shiftHeld = true; 
	// 			break;
	// 		case KeyboardInput.KEYCODE_SPACE: 
	// 			this.trigger(KeyboardInput.KEYCODE_SPACE);
	// 			this.spaceHeld = true; 
	// 			break;
	// 		case KeyboardInput.KEYCODE_p: 
	// 			this.trigger(KeyboardInput.KEYCODE_p);
	// 			break;
	// 		case KeyboardInput.KEYCODE_w:
	// 		case KeyboardInput.KEYCODE_UP:    
	// 			this.upHeld = true;    
	// 			break;
	// 		case KeyboardInput.KEYCODE_s:
	// 		case KeyboardInput.KEYCODE_DOWN:	 
	// 			this.downHeld = true;  
	// 			break;
	// 		case KeyboardInput.KEYCODE_a:
	// 		case KeyboardInput.KEYCODE_LEFT:	 
	// 			this.leftHeld = true;  
	// 			break;
	// 		case KeyboardInput.KEYCODE_d:
	// 		case KeyboardInput.KEYCODE_RIGHT: 
	// 			this.rightHeld = true; 
	// 			break;
	// 		default: 
	// 			break;
	// 	}
	// };

	// p.handleKeyUp = function(e) {
	// 	if(!e){ var e = window.event; }
	// //	console.log("KEYDOWN: " + e.keyCode);
	// 	switch(e.keyCode) {
	// 		case KeyboardInput.KEYCODE_SHIFT: 
	// 			this.shiftHeld = false; 
	// 			break;
	// 		case KeyboardInput.KEYCODE_SPACE: 
	// 			this.spaceHeld = false; 
	// 			break;
	// 		case KeyboardInput.KEYCODE_w:
	// 		case KeyboardInput.KEYCODE_UP:    
	// 			this.upHeld = false;   
	// 			break;
	// 		case KeyboardInput.KEYCODE_s:
	// 		case KeyboardInput.KEYCODE_DOWN:	 
	// 			this.downHeld = false;  
	// 			break;
	// 		case KeyboardInput.KEYCODE_A:
	// 		case KeyboardInput.KEYCODE_LEFT:	 
	// 			this.leftHeld = false;  
	// 			break;
	// 		case KeyboardInput.KEYCODE_D:
	// 		case KeyboardInput.KEYCODE_RIGHT: 
	// 			this.rightHeld = false; 
	// 			break;
	// 		default: 
	// 			break;
	// 	}
	// };

	window.KeyboardInput = KeyboardInput;
	
}(window));