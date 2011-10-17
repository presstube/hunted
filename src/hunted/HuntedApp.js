(function(window) {
	
	var HuntedApp = function() {

		var	that = this,
			numChasersToSpawn = 1,
			paused = false,
			wrapRadius = 2000,
			chasers = [],
			projectiles = [],
			keyboardInput = new KeyboardInput(),
			canvas = document.getElementById("canvas"),
			stage = new Stage(canvas),
			fpsLabel = PTUtils.makeFPSLabel(),
			scaleStage = new ScaleStage(),
			trackingStage = new TrackingStage(),
			levelText = new Text("-- fps","bold 20px Arial","#FFF"),

			parallaxScroller = new ParallaxScroller({
				app: this,
				trackingStage : trackingStage,
				wrapRadius: wrapRadius,
				numItems: 50
			}),

			itemScroller = new ItemScroller({
				scaleStage: scaleStage,
				trackingStage: trackingStage,
				wrapRadius: wrapRadius,
				numItems: 50
			}),

			ship = new Ship({
				name: "herooooo",
				controlsClass: ShipControlsKeyboard,
				skinClass: ShipSkinGeneric,
				drag: 0.95,
				thrustLimit: 2,
				boostThrust: 3,
				boostFuelLimit: 20,
				boostRegenerateFrequency: 10,
				steeringResponse: 2,
				steeringLimit: 10,
				launcherSpread: 10,
				projectileThrust: 40,
				shotsPerLaunch: 10,
				projectileLife: 20,
				projectileLimit: 200,
				keyboardInput: keyboardInput,
				projectiles: projectiles
			});

		var spawnChasers = function() {
			//LEVEL UP??
			for (var i = 0; i < numChasersToSpawn; i++) {
				spawnChaser();
			}
			levelText.text = "LEVEL " + numChasersToSpawn;
			numChasersToSpawn++;
		};

		var spawnChaser = function() {
			var chaser = new Ship({
				name: "chaser: " + Math.random(),
				controlsClass: ShipControlsAIChase,
				skinClass: ShipSkinGoon,
				thrustLimit: 4,
				steeringAccuracy: 10,
				steeringLimit: 10,
				target: ship
			});
			
			var spawnPoint = PTUtils.polarDegrees(wrapRadius, Math.random()*360);
			chaser.x = ship.x + spawnPoint.x;
			chaser.y = ship.y + spawnPoint.y;
			chasers.push(chaser);
			trackingStage.addChild(chaser);
		};

		var checkForHits = function(){

			if (chasers.length > 0) {

				// check chasers against ship for hit

				_.each(chasers, function(chaser) {
					var globalLauncherPoint = chaser.launcher.localToGlobal(0, 0);
					var globalShipPoint = ship.localToGlobal(0, 0);
					var distToShip = PTUtils.distance(globalLauncherPoint, globalShipPoint);
					
					if (distToShip < 40) {
						var localHitPoint = ship.globalToLocal(globalLauncherPoint.x, globalLauncherPoint.y);
						var hit = ship.hitTest(localHitPoint.x, localHitPoint.y);
						if (hit) {
							ship.kill();
							gameOver();
						}
					}

					// while you're at it check projectiles against chaser for hit

					_.each(projectiles, function(projectile) {

						var dist = PTUtils.distance(new Point(chaser.x, chaser.y), new Point(projectile.x, projectile.y));

						if (dist < 40) {
							var localHitPoint = projectile.localToLocal(0, 0, chaser); 
							var hit = chaser.hitTest(localHitPoint.x, localHitPoint.y);
							if (hit) {
								trackingStage.removeChild(chaser);
								for (var k = 0; k < chasers.length; k++) {
									if (chaser === chasers[k]) {
										chasers.splice(k, 1);
									}
								}
								if (chasers.length === 0) {
									spawnChasers();
								}
							}
						}

					});
				});
			}

		};

		var engageTick = function() {
			that.tick = function(){
				checkForHits();
				stage.update();
			};
		};

		var disengageTick = function() { 
			that.tick = undefined;
		};
		
		var start = function() {
			_.each(chasers, function(chaser){ chaser.kill(); });
			chasers = [];
			// numChasersToSpawn = 1;
			if (numChasersToSpawn > 1) numChasersToSpawn--;
			trackingStage.addChild(ship);
			spawnChasers();
		};
		
		var gameOver = function() {
			// console.log("<!!!!!!!!!!!!!!!>");
			// console.log("<!!! YOU DIE !!!>");
			// console.log("<!!!!!!!!!!!!!!!>");
			$(document).bind('keydown', 'space',function onRestartSpacePressed() {
					console.log("SPACE");
					start();
					$(document).unbind('keydown', onRestartSpacePressed);
				}
			);
			// keyboardInput.bind(KeyboardInput.KEYCODE_SPACE, function onRestartSpacePressed() {
			// 		start();
			// 		keyboardInput.unbind(KeyboardInput.KEYCODE_SPACE, onRestartSpacePressed);
			// 	}
			// );
		};
	
		var resize = function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			scaleStage.x = canvas.width / 2;
			scaleStage.y = canvas.height / 2; 
			stage.update();
		};

		keyboardInput.bind(KeyboardInput.KEYCODE_p, function() {
			if (paused) {
				unPause();
			} else {
				pause();
			}

			function pause() {
				keyboardInput.bind(KeyboardInput.KEYCODE_SPACE, onPauseSpacePressed);
				console.log("PAUSE");
				that.tick = undefined;
				paused = true;
			}

			function unPause() {
				keyboardInput.unbind(KeyboardInput.KEYCODE_SPACE, onPauseSpacePressed);
				console.log("UNPAUSE");
				engageTick();
				paused = false;
			}

			function onPauseSpacePressed() {
				console.log("PAUSE SPACE");
				unPause();
			}
		});

		stage.addChild(fpsLabel, levelText, scaleStage);

		levelText.x = 10; levelText.y = 40;

		scaleStage.addChild(trackingStage);
		scaleStage.addChildAt(parallaxScroller, 0);
		scaleStage.setTargetScale(0.75);

		trackingStage.addChild(itemScroller);
		trackingStage.addChild(ship);
		trackingStage.setTrackingTarget(ship);
		
		Ticker.setFPS(30);
		Ticker.addListener(this);

		engageTick();
		
		resize();

		start();

		window.onresize = resize;
		window.sp = ship.props;
	};

	window.HuntedApp = HuntedApp;

}(window));