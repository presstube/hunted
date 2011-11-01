(function(window){
	
	var Nav = function(reference) {

		var target, 
			targetGroup = [],
			navItems = [],
			maxPerimeter = 1200,
			minPerimeter = 400,
			range = maxPerimeter - minPerimeter,
			distMultiplier = 1,
			ref = reference;

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

			var closest, closestDist = 99999999999; // dirty

			_.each(targetGroup, function(target) {
				var globalReferencePos = ref.localToGlobal(0,0);
				var globalTargetPos = target.localToGlobal(0,0);
				var localReferencePos = ref.globalToLocal(globalTargetPos.x, globalTargetPos.y);
				var dist = PTUtils.distance(new Point(0, 0), localReferencePos);
				if (dist < closestDist) {
					closestDist = dist;
					closest = target;
				}
			});

			distMultiplier = (closestDist - minPerimeter) / range;
			if ( distMultiplier < 0 ) distMultiplier = 0;
			if ( distMultiplier > 1 ) distMultiplier = 1;
			distMultiplier = 1 - distMultiplier;

			setTarget(closest);
		}

		function getDistMultiplier() {
			return distMultiplier;
		}

		function setReference(reference) {
			ref = reference;
		}

		Ticker.addListener(this);
		
		this.tick = function(){

			if (navItems.length > 0) rotateNavItems();

			if (targetGroup.length > 0) {
				targetClosest();
			}
		};



		// api
		this.setTarget = setTarget;
		this.setTargetGroup = setTargetGroup;
		this.getTarget = getTarget;
		this.registerNavItem = registerNavItem;
		this.unregisterNavItem = unregisterNavItem;
		this.getDistMultiplier = getDistMultiplier;
		this.setReference = setReference;
	};

	window.Nav = Nav;

}(window));