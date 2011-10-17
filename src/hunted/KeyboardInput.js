(function(window) {

	var KeyboardInput = function() {
		var that = this;
		this.name = Math.random();
		document.onkeydown = function(e) { that.handleKeyDown(e); };
		document.onkeyup = function(e) { that.handleKeyUp(e); };
		_.extend(this, Backbone.Events);
	};

	var p = KeyboardInput.prototype = new Object();

	p.toString = function() {
		return "[KeyboardInput (name="+  this.name +")]";
	};

	KeyboardInput.KEYCODE_SHIFT = 16;
	KeyboardInput.KEYCODE_SPACE = 32;
	KeyboardInput.KEYCODE_UP = 38;
	KeyboardInput.KEYCODE_DOWN = 40;
	KeyboardInput.KEYCODE_LEFT = 37;
	KeyboardInput.KEYCODE_RIGHT = 39;
	KeyboardInput.KEYCODE_w = 87;
	KeyboardInput.KEYCODE_s = 83;
	KeyboardInput.KEYCODE_a = 65;
	KeyboardInput.KEYCODE_d = 68;
	KeyboardInput.KEYCODE_p = 80;

	p.shiftHeld = false;
	p.spaceHeld = false;
	p.upHeld = false;
	p.downHeld = false;
	p.leftHeld = false;
	p.rightHeld = false;

	p.handleKeyDown = function(e) {
		if(!e){ var e = window.event; }
	//	console.log("KEYDOWN: " + e.keyCode, this.name);
		switch(e.keyCode) {
			case KeyboardInput.KEYCODE_SHIFT: 
				this.shiftHeld = true; 
				break;
			case KeyboardInput.KEYCODE_SPACE: 
				this.trigger(KeyboardInput.KEYCODE_SPACE);
				this.spaceHeld = true; 
				break;
			case KeyboardInput.KEYCODE_p: 
				this.trigger(KeyboardInput.KEYCODE_p);
				break;
			case KeyboardInput.KEYCODE_w:
			case KeyboardInput.KEYCODE_UP:    
				this.upHeld = true;    
				break;
			case KeyboardInput.KEYCODE_s:
			case KeyboardInput.KEYCODE_DOWN:	 
				this.downHeld = true;  
				break;
			case KeyboardInput.KEYCODE_a:
			case KeyboardInput.KEYCODE_LEFT:	 
				this.leftHeld = true;  
				break;
			case KeyboardInput.KEYCODE_d:
			case KeyboardInput.KEYCODE_RIGHT: 
				this.rightHeld = true; 
				break;
			default: 
				break;
		}
	};

	p.handleKeyUp = function(e) {
		if(!e){ var e = window.event; }
	//	console.log("KEYDOWN: " + e.keyCode);
		switch(e.keyCode) {
			case KeyboardInput.KEYCODE_SHIFT: 
				this.shiftHeld = false; 
				break;
			case KeyboardInput.KEYCODE_SPACE: 
				this.spaceHeld = false; 
				break;
			case KeyboardInput.KEYCODE_w:
			case KeyboardInput.KEYCODE_UP:    
				this.upHeld = false;   
				break;
			case KeyboardInput.KEYCODE_s:
			case KeyboardInput.KEYCODE_DOWN:	 
				this.downHeld = false;  
				break;
			case KeyboardInput.KEYCODE_A:
			case KeyboardInput.KEYCODE_LEFT:	 
				this.leftHeld = false;  
				break;
			case KeyboardInput.KEYCODE_D:
			case KeyboardInput.KEYCODE_RIGHT: 
				this.rightHeld = false; 
				break;
			default: 
				break;
		}
	};

	window.KeyboardInput = KeyboardInput;
	
}(window));