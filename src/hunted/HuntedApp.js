(function(window) {
	
	var HuntedApp = function() {

		var	app = this,
			canvas = document.getElementById("canvas"),
			stage = new Stage(canvas),
			fpsLabel = PTUtils.makeFPSLabel(),
			scaleStage = new ScaleStage(),
			trackingStage = new TrackingStage(),
			nav = new Nav(scaleStage),
			drag = 0.95,
			wrapRadius = 3000,
			boostFuelLimit = 40, // shouldnt be here
			chasers = [],
			projectiles = [],
			
			numChasersToSpawn = 1,
			levelText = new Text("-- fps","bold 20px Arial","#FFF"),
			paused = false,
			gameState = "GAME_OVER", // crappy

			parallaxScroller = new ParallaxScroller({
				app: app,
				wrapRadius: wrapRadius,
				nav: nav,
				numItems: 50
			}),

			player = new Ship({
				app: app,
				name: "hero",
				controlsClass: ShipControlsKeyboard,
				skinClass: ShipSkinGeneric,
				engineClass: ShipEngineGeneric,

				// for the engine
				thrustLimit: 2,
				
				// for the booster
				boostThrust: 5,
				boostFuelLimit: boostFuelLimit,
				boostRegenerateFrequency: 4,

				// for the steering
				steeringResponse: 2,
				steeringLimit: 10,

				// for the gun
				launcherSpread: 5,
				projectileThrust: 40,
				shotsPerLaunch: 1,
				projectileLife: 20,
				projectileLimit: 200,

				// for the heatseeker
				targetFunc: nav.getTarget
			}),

			itemScroller = new ItemScroller({
				app: app,
				numItems: 20,
				wrapRadius: wrapRadius
			});



		stage.addChild(fpsLabel, levelText, scaleStage);

		levelText.x = 10; levelText.y = 40;

		scaleStage.addChild(trackingStage);
		scaleStage.addChildAt(parallaxScroller, 0);
		scaleStage.setScaleMultiplier(0.2);

		trackingStage.addChild(itemScroller);
		trackingStage.addChild(player);
		trackingStage.setTrackingTarget(player);

		this.stage = stage;
		this.scaleStage = scaleStage;
		this.trackingStage = trackingStage;
		this.player = player;
		this.chasers = chasers;
		this.projectiles = projectiles;
		this.drag = drag;

		nav.setReference(player);

		nav.setTargetGroup(chasers);
		
		setupTicker();
		rigPauseKey();
		resize();

		start();







		function setupTicker() {
			Ticker.setFPS(30);
			Ticker.addListener(app);
			engageTick();
		}

		function engageTick() {
			app.tick = function(){
				checkForHits();
				stage.update();
				// set scaleStage's setScaleMultiplier with nav's getDistMultiplier()
				if (gameState == "GAME_ON") {
					scaleStage.setScaleMultiplier(nav.getDistMultiplier());
				} else {
					scaleStage.setScaleMultiplier(0.5);
				}

				// move stage back to 0,0 to compensate for Boost shudder
				stage.x += (0 - stage.x) / 1.5;
				stage.y += (0 - stage.y) / 1.5;
			};
		}

		function disengageTick() { 
			app.tick = undefined;
		}

		function start() {
			gameState = "GAME_ON";
			while (chasers.length > 0) {
				chasers.pop().kill();
			}
			while (projectiles.length > 0) {
				projectiles.pop().kill();
			}
			numChasersToSpawn = 1; // would kick you back to level 1
			if (numChasersToSpawn > 1) numChasersToSpawn--;
			trackingStage.addChild(player);
			spawnChasers();
			player.skin.boost.setBoostFuel(boostFuelLimit);
		}

		function gameOver() {
			gameState = "GAME_OVER";
			$(document).bind('keydown', 'space',function onRestartSpacePressed() {
					start();
					$(document).unbind('keydown', onRestartSpacePressed);
				}
			);
		}

		function spawnChasers() {
			//LEVEL UP??
			_.times(numChasersToSpawn, spawnChaser);
			levelText.text = "LEVEL " + numChasersToSpawn;
			numChasersToSpawn++;
		}

		function spawnChaser() {
			var chaser = new Ship({
				app: app,
				name: "chaser: " + Math.random(),
				controlsClass: ShipControlsAIChase,
				skinClass: ShipSkinGoon,
				thrustLimit: 2.5,
				steeringAccuracy: 10,
				steeringLimit: 10,
				target: player
			});
			
			var spawnPoint = PTUtils.polarDegrees(wrapRadius, Math.random()*360);
			chaser.x = player.x + spawnPoint.x;
			chaser.y = player.y + spawnPoint.y;
			chasers.push(chaser);
			trackingStage.addChild(chaser);
		}

		function checkForHits(){

			if (chasers.length > 0) {

				// check chasers against player for hit

				_.each(chasers, function(chaser) {
					var globalLauncherPoint = chaser.launcher.localToGlobal(0, 0);
					var globalShipPoint = player.localToGlobal(0, 0);
					var distToShip = PTUtils.distance(globalLauncherPoint, globalShipPoint);
					
					if (distToShip < 40) {
						var localHitPoint = player.globalToLocal(globalLauncherPoint.x, globalLauncherPoint.y);
						var hit = player.hitTest(localHitPoint.x, localHitPoint.y);
						if (hit) {
							player.kill();
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

								var k;

								trackingStage.removeChild(projectile);
								for (k = 0; k < projectiles.length; k++) {
									if (projectile === projectiles[k]) {
										projectiles.splice(k, 1);
									}
								}

								trackingStage.removeChild(chaser);
								for (k = 0; k < chasers.length; k++) {
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

		}

		function rigPauseKey() {
			$(document).bind('keydown', 'p', function() {
				if (paused) {
					unPause();
				} else {
					pause();
				}

				function pause() {
					$(document).bind('keydown', 'space', onPauseSpacePressed);
					console.log("PAUSE");
					app.tick = undefined;
					paused = true;
				}

				function unPause() {
					$(document).unbind('keydown', onPauseSpacePressed);
					console.log("UNPAUSE");
					engageTick();
					paused = false;
				}

				function onPauseSpacePressed() {
					console.log("PAUSE SPACE");
					unPause();
				}
			});
		}
	
		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			scaleStage.x = canvas.width / 2;
			scaleStage.y = canvas.height / 2; 
			stage.update();
		}

		window.onresize = resize;
		window.sp = player.props;
		window.scaleStage = scaleStage;

	};

	HuntedApp.prototype.toString = function() {
		return "[HuntedApp]";
	};

	window.HuntedApp = HuntedApp;

}(window));