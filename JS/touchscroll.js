// 滑屏滚动
(function( window ){
	if ( !window._touch ) {
		window._touch = {};
	}
	//通用滑动效果（回弹+惯性,只做x方向上的滑动）
	_touch.Scroll = function ( callback ){
		var fatherBox = document.body;
		var sonBox = fatherBox.children[0];
		var fatherHeight = fatherBox.offsetHeight;
		var sonHeight = sonBox.offsetHeight;
		var minDistance = 0;
		var maxDistance = -sonHeight + fatherHeight;
		var bufferDistance = 150;
		var minTar = minDistance + bufferDistance;
		var maxTar = maxDistance - bufferDistance;
		var currentPos = 0;
		var startY = 0
		var startTime = 0;
		var isMove = null;
		sonBox.addEventListener('touchstart',function(e){
			startY = e.touches[0].pageY;
			startTime = Date.now();
			this.style.transition = "";
			isMove = false;
		});
		sonBox.addEventListener('touchmove',function(e){
			isMove = true;
			var moveY = e.touches[0].pageY - startY;
			var thisPos = moveY + currentPos;
			if (thisPos > minTar) {
				thisPos = minTar;
			}else if (thisPos < maxTar) {
				thisPos = maxTar;
			}
			this.style.transform = 'translateY(' + thisPos + 'px)';	
		});
		sonBox.addEventListener('touchend',function(e){
			var endY = e.changedTouches[0].pageY - startY;
			var endTIme = (Date.now() - startTime);
			var toY = endY + currentPos;
			if (isMove) {
				//手指触摸移动判断
				if (endTIme < 300) {
					// 惯性判断
					var v = endY / endTIme; //计算滑动速度
					var dir = v > 0 ? 1 : -1; //加速度方向
					var a = dir * 0.0006; //加速度
					var tar = v  / 2 * ( v / a); //缓冲距离
					toY = toY + tar;
				}
			}else{
				// 触摸点击判断
				if (callback) {
					toY = callback(e,endTIme,toY);
				}
			}
			if (toY > minDistance) {
				toY = minDistance;
			}else if(toY < maxDistance){
				toY = maxDistance;
			}
			currentPos = toY;
			this.style.transition = "all 0.4s";
			this.style.transform = 'translateY(' + currentPos + 'px)';
			// 重置
			startY = 0;
			startTime = 0;
			isMove = false;
		});
	}
})( window )