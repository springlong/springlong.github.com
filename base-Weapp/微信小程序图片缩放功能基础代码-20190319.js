
      // 全屏图片触摸start
      handleTouchFullImageStart(evt) {
        console.log('handleTouchFullImageStart', evt.touches)

        // // 单手指缩放开始，也不做任何处理
        // if (evt.touches.length === 1) {
        //   console.log("单滑了")
        //   return;
        // }

        // 当两根手指放上去的时候，就将 distance 初始化。
        // let xMove = e.touches[1].clientX - e.touches[0].clientX;
        // let yMove = e.touches[1].clientY - e.touches[0].clientY;
        // let distance = Math.sqrt(xMove * xMove + yMove * yMove);
        // // this.touchDistance = distance
        // console.log('双手指触发开始', distance)
      },

      // 全屏图片触摸move
      handleTouchFullImageMove(evt) {
        console.log('handleTouchFullImageMove', evt.touches)

        // 单手指缩放我们不做任何操作
        if (evt.touches.length === 1) {
          console.log("handleTouchFullImageMove-单滑了");
          return;
        }

        let xMove = evt.touches[1].clientX - evt.touches[0].clientX;  // 手指在x轴移动距离
        let yMove = evt.touches[1].clientY - evt.touches[0].clientY;  // 手指在y轴移动距离
        let distance = Math.sqrt(xMove * xMove + yMove * yMove); // 根据勾股定理算出两手指之间的距离

        if (this.touchDistance === undefined) {
          // 第一次没有参考距离时进行赋值，用于第二次计算使用
          this.touchDistance = distance
          this.touchScale = 1
          console.log('双手指运动开始-没有参考值', distance)
        } else {
          // 第二次有值了计算差值
          let distanceDiff = distance - this.touchDistance;
          let newScale = this.touchScale + 0.005 * distanceDiff
          console.log('双手指运动开始-计算差值')
          console.log(`distanceDiff:${distanceDiff}___newScale:${newScale}`)
        }

        // // 为了防止缩放得太大，所以scale需要限制，同理最小值也是
        // if (newScale >= 2) {
        //   newScale = 2
        // }
        // if (newScale <= 0.6) {
        //   newScale = 0.6
        // }
        // let scaleWidth = newScale * this.touchBaseWidth
        // let scaleHeight = newScale * this.touchBaseHeight

        // // 赋值 新的 => 旧的
        // this.touchDistance = distance
        // this.touchDiff = distanceDiff
        // this.touchScale = newScale
        // this.touchScaleWidth = scaleWidth
        // this.touchScaleHeight = scaleHeight
      },

      // 全屏图片加载完毕
      handleLoadFullImage(evt) {
        console.log('handleLoadFullImage', evt.detail)
        // this.touchBaseWidth= evt.detail.width
        // this.touchBaseHeight= evt.detail.height
        // this.touchScale = 1
        // this.touchScaleWidth= evt.detail.width
        // this.touchScaleHeight= evt.detail.height
      },
