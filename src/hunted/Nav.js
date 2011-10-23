(function(window){
	
	var Nav = function(reference) {

		var target, 
			targetGroup = [],
			navItems = [];


		function setTarget(newTarget) {
			target = newTarget;
		}

		function setTargetGroup(newTargetGroup) {

			targetGroup = newTargetGroup;
		}

		function getTarget() { 
			return target;
		}

		function registerNavItem(navItem) {
			console.log("registering nav item");
			navItems.push(navItem);
		}

		function unregisterNavItem(navItem) {
			navItems.splice(_.indexOf(navItems, navItem), 1);
		}

		function rotateNavItems() {

			if (target) {
				
				for (var i = 0; i < navItems.length; i++) {
					var navItem = navItems[i];

					var itemGlobalPos = navItem.localToGlobal(0,0);
					var targetGlobalPos = target.localToGlobal(0,0);
					var degreesToTarget = PTUtils.angleDegrees(itemGlobalPos, targetGlobalPos);
					var thisDegrees = PTUtils.getAdjustedRotation(navItem.rotation);
					var diff = degreesToTarget - thisDegrees;
					if (diff < -180) {
						degreesToTarget += 360;
					} else if (diff > 180) {
						thisDegrees += 360;
					}
					var finalDiff = degreesToTarget - thisDegrees;
					navItem.rotation += finalDiff / 10;
					
				}

			}

		}

		function targetClosest() {
			// console.log("tttt closet");

			var closest, closestDist = 99999999999; // this could technically break the nav if dealing with big enough distances

			_.each(targetGroup, function(target) {
				var globalReferencePos = reference.localToGlobal(0,0);
				var globalTargetPos = target.localToGlobal(0,0);
				var dist = PTUtils.distance(globalReferencePos, globalTargetPos);
				if (dist < closestDist) {
					closestDist = dist;
					closest = target;
				}
			});

			setTarget(closest);
		}

		Ticker.addListener(this);
		this.tick = function(){

			if (navItems.length > 0) rotateNavItems();

			console.log("targetGroup: ", targetGroup);

			if (targetGroup.length > 0) {
				console.log("tttt: " + targetGroup.length);
				targetClosest();
			}
		};

		// api
		this.setTarget = setTarget;
		this.setTargetGroup = setTargetGroup;
		this.getTarget = getTarget;
		this.registerNavItem = registerNavItem;
		this.unregisterNavItem = unregisterNavItem;
	};

	window.Nav = Nav;

}(window));