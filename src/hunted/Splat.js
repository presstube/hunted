(function(window){

	/*
		props { 
			app: App,
			force: Point
		}
	*/

	var Splat = function(props) { this.initialize(props); };
	var p = Splat.prototype = new Container();
	p.Container_initialize = p.initialize;

	p.initialize = function(props) {
		this.Container_initialize();

		var splat = this;

		for(var i = 0; i < 10; i++) {
			makeChunk(i);
		}

		function makeChunk(i) {
			var chunk = PTUtils.makeTriangle("#f00", 10, 10);
			var chunkForceAbility = new ForceAbility({target: chunk, app: app});
			chunk.addForce(PTUtils.polarDegrees(Math.random()*10, Math.random()*360));
			chunk.addForce(props.force);
			chunk.rotAmount = Math.random()*5 - Math.random()*5;
			chunk.tick = function() { 
				chunkForceAbility.update(); 
				chunk.rotation += chunk.rotAmount;
				chunk.alpha -= 0.05;
			};
			splat.addChild(chunk);
		}

		_.delay(function() {
			splat.parent.removeChild(splat);
		}, 1000);

	};



	window.Splat = Splat;

}(window));