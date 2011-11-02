(function(window) {
	
	var HuntedApp = function() {

		var	that = this,
			drag = 0.95,
			gameState = "GAME_OVER",
			numChasersToSpawn = 1,
			paused = false,
			wrapRadius = 3000,
			chasers = [],
			projectiles = [],
			canvas = document.getElementById("canvas"),
			stage = new Stage(canvas),
			fpsLabel = PTUtils.makeFPSLabel(),
			scaleStage = new ScaleStage(),
			trackingStage = new TrackingStage(),
			nav = new Nav(scaleStage),
			levelText = new Text("-- fps","bold 20px Arial","#FFF"),
			fuelLimit = 40,

			parallaxScroller = new ParallaxScroller({
				app: this,
				trackingStage : trackingStage,
				wrapRadius: wrapRadius,
				nav: nav,
				numItems: 50
			}),

			ship = new Ship({
				name: "hero",
				controlsClass: ShipControlsKeyboard,
				skinClass: ShipSkinGeneric,
				drag: 0.95,
				thrustLimit: 2,
				boostThrust: 5,
				boostFuelLimit: fuelLimit,
				boostRegenerateFrequency: 4,
				steeringResponse: 2,
				steeringLimit: 10,
				launcherSpread: 5,
				projectileThrust: 40,
				shotsPerLaunch: 1,
				projectileLife: 20,
				projectileLimit: 200,
				targetFunc: nav.getTarget,
				trackingStage: trackingStage,
				projectiles: projectiles
			}),

			itemScroller = new ItemScroller({
				app: this,
				scaleStage: scaleStage,
				trackingStage: trackingStage,
				wrapRadius: wrapRadius,
				numItems: 20,
				ship: ship
			}),

			mask = PTUtils.makeCircle('555', 500);

		stage.addChild(fpsLabel, levelText, scaleStage);

		mask.compositeOperation = "destination-atop";

		levelText.x = 10; levelText.y = 40;

		scaleStage.addChild(trackingStage);
		scaleStage.addChildAt(parallaxScroller, 0);
		scaleStage.setScaleMultiplier(0.2);

		trackingStage.addChild(itemScroller);
		trackingStage.addChild(ship);
		trackingStage.setTrackingTarget(ship);

		this.ship = ship;
		this.chasers = chasers;
		this.projectiles = projectiles;
		this.trackingStage = trackingStage;
		this.stage = stage;
		this.drag = drag;

		nav.setReference(ship);

		nav.setTargetGroup(chasers);
		
		setupTicker();
		rigPauseKey();
		resize();


		start();


		function setupTicker() {
			Ticker.setFPS(30);
			Ticker.addListener(that);
			engageTick();
		}

		function engageTick() {
			that.tick = function(){
				checkForHits();
				stage.update();
				// set scaleStage's setScaleMultiplier with nav's getDistMultiplier()
				if (gameState == "GAME_ON") {
					scaleStage.setScaleMultiplier(nav.getDistMultiplier());
				} else {
					scaleStage.setScaleMultiplier(0.5);
				}

				stage.x += (0 - stage.x) / 1.5;
				stage.y += (0 - stage.y) / 1.5;
			};
		}

		function disengageTick() { 
			that.tick = undefined;
		}

		function start() {
			gameState = "GAME_ON";
			// _.each(chasers, function(chaser){ chaser.kill(); });
			// chasers = [];
			while (chasers.length > 0) {
				chasers.pop().kill();
			}
			while (projectiles.length > 0) {
				projectiles.pop().kill();
			}
			numChasersToSpawn = 1; // would kick you back to level 1
			if (numChasersToSpawn > 1) numChasersToSpawn--;
			trackingStage.addChild(ship);
			spawnChasers();
			ship.skin.boost.setBoostFuel(fuelLimit);
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
		}

		function checkForHits(){

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
					that.tick = undefined;
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
			mask.x = canvas.width / 2;
			mask.y = canvas.height / 2; 
			stage.update();
		}

		window.onresize = resize;
		window.sp = ship.props;
		window.scaleStage = scaleStage;

	};

	window.HuntedApp = HuntedApp;

}(window));