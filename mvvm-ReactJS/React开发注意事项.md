# React开发注意事项

## 组件分组规划如何做到快速查找目标组件，以及快速理清组件间的通信流程和过程？

## 方法的命名和书写顺序

1. `constructor(props) {}` 始终放到首要位置进行书写;

2. React的生命周期函数紧接 `constructor` 之后按照触发的先后顺序进行集中书写;

3. 获取远程数据的方法统一以 `get` 开头，例如：`getPageData() {}`;

4. 缓存相关数据的方法统一以 `set` 开头，例如：`setCacheFormInitData() {}`;

4. 检测相关状态的方法统一以 `check` 开头，例如：`checkFormEdit() {}`、`checkIsFilter() {}`;

5. 事件绑定的方法统一以 `handle` 开头，例如：`handleSubmit() {}`;

6. 在以 `handle` 开头的事件处理函数中，可能会继续拆分为若干个功能执行函数，此时我们统一以 `do` 开头对它们进行命名，例如：`doSubmitSuccess() {}` `doSubmitFail() {}`；

7. 对于 Form 表单的验证规则，如果需要抽出去独立函数，那么统一以 `valid` 开头，例如：`validUserName() {}`；

6. `render()` 方法统一放在末尾书写，如果处理的内容和代码量较多，需要根据模块拆分为若干个以 `render` 开头的方法在其之前进行书写，然后在 `render()` 方法中进行组合和拼装。


## 数据加载和变更的注意事项

1. 统一以 `is` 开头的 state 来管理组件展示和处理过程中需要用到的不同状态的区分，其中通过 `this.state.isDone` 来表示是否完成首次数据加载，这样可以有效区分加载数据前的页面呈现；

2. 通过筛选项的变更、模糊查询等方式导致重新加载页面数据，往往会在 `setState` 后去触发加载数据的方法，我们应该将那些会影响页面布局呈现的 state 在加载完数据后再去 setState，这样可以避免重载数据前后页面出现明显的闪动问题；


## 判断表单是否被编辑

如果每次进入表单所在的组件都会触发 `componentDidMount` 生命周期函数，那么就在该生命周期函数中触发 `setCacheFormInitData` 函数设置初始表单的缓存数据。

如果是弹层， `componentDidMount` 仅触发一次，那么可以在每次显示该弹层触发 `render` 后执行 `setCacheFormInitData` 函数设置初始表单的缓存数据。

	// 获取提交所需传递的数据
	// 通过noMessage来控制是否需要提示错误信息
	getSubmitData(noMessage) {
	  const values = this.props.form.getFieldsValue()
		// 针对表单数据的其它处理...
	  return values;
	}

	// 设置初始表单缓存数据
	setCacheFormInitData() {
	  const noMessage = true
	  const cacheData = this.getSubmitData(noMessage) || ''
	  this.state.cacheFormInitData = JSON.stringify(cacheData);
	  // eslint-disable-next-line
	  console.log('setCacheFormInitData', cacheData)
	}

	// 检测表单是否被编辑
	checkFormEdit() {
	  const noMessage = true
	  const submitData = this.getSubmitData(noMessage);
	  const isEditForm = JSON.stringify(submitData) !== this.state.cacheFormInitData;
	  // eslint-disable-next-line
	  console.log('checkFormEdit', submitData, isEditForm);
    return isEditForm;
	}

	// 用于render中检测是否需要设置表单缓存数据
	checkSetCacheFormInitDataInRender() {
	  const {data} = this.state

	  // didRenderAlready用于避免首次render时缓存数据
	  if (this.didRenderAlready && ((data && data.id))) {
	    if (this.waitRenderCount !== undefined) {
	      // waitRenderCount用于表示提交数据并刷新表单数据后需要等待render的次数
	      this.waitRenderCount -= 1
	    }

			// didSetCacheFormInitData用来判断是否执行了缓存操作
	    if (!this.didSetCacheFormInitData && (this.waitRenderCount === undefined || this.waitRenderCount <= 0)) {
	      this.didSetCacheFormInitData = 1
	      this.setCacheFormInitData()
	    }
	  }
	  this.didRenderAlready = true
	}

	// 提交保存数据
	handleSubmit(e) {
		// 提交数据并刷新数据，需要重新记录表单缓存数据
    this.didSetCacheFormInitData = 0;
    // 根据实际情况设置需要等待render的次数
    this.waitRenderCount = 2;
	}

	// 返回上一页
	handleReturn(e) {
	  // 检测表单是否编辑过
	  if (this.checkFormEdit()) {
	    MessageNew.confirm({
	      title: '是否确认退出？',
	      content: '直接退出将不会保存已编辑内容',
	      okText: '确认',
	      cancelText: '取消',
	      onOk: () => {
	        this.doReturn();
	      },
	      onCancel: () => {},
	    });
	  } else {
	    this.doReturn();
	  }
	}

	// 组件挂载完成
  componentDidMount() {
    window.onbeforeunload = () => {
      if (this.checkFormEdit()) {
        return '直接退出将不会保存此次编辑信息，是否确认退出？'
      }
    }
  }

	// 组件即将卸载
	componentWillUnmount() {
	  window.onbeforeunload = null;
	}

	render() {
	  // 用于render中检测是否需要设置表单缓存数据
	  this.checkSetCacheFormInitDataInRender();
	}


## 路由变更的提示案例

	routerWillLeave(nextLocation) {
    const {action} = this.props.routeParams
    if (
      nextLocation.query.isDidRouteLeave === undefined
      && (action === 'house' || action === 'room' || action === 'addRoom')
    ) {
      // 客房编辑页面需要给出提示
      MessageNew.confirm({
        title: '是否确认退出？',
        content: '直接退出将不会保存已编辑内容',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          Util.push({
            pathname: nextLocation.pathname,
            query: Object.assign({isDidRouteLeave: 1}, nextLocation.query),
          })
        },
        onCancel: () => {},
      });
      return false
    }
    return true
	},
	routerWillLeave(nextLocation) {
	  const isDidRouteLeave = window.localStorage.getItem('isDidRouteLeave')
	  // console.log('routerWillLeave', isDidRouteLeave)

	  if (
	    isDidRouteLeave != '1'
	    && (this.shareInfo.checkFormEdit && this.shareInfo.checkFormEdit())
	  ) {
	    window.cacheUrlJump_pathname = nextLocation.pathname
	    window.cacheUrlJump_query = nextLocation.query
	    if (window.localStorage.getItem('isShowRouteLeaveMessage') != '1') {
	      // 客房编辑页面需要给出提示
	      window.localStorage.setItem('isShowRouteLeaveMessage', 1)
	      MessageNew.confirm({
	        className: 'exitPageConfirm',
	        title: '即将离开当前页面，该页面所做的修改不会保留',
	        okText: '确定离开',
	        cancelText: '继续编辑',
	        onOk: () => {
	          window.localStorage.setItem('isShowRouteLeaveMessage', 0)
	          window.localStorage.setItem('isDidRouteLeave', 1)
	          Util.push({
	            pathname: window.cacheUrlJump_pathname,
	            query: window.cacheUrlJump_query,
	          })
	          setTimeout(() => {
	            window.localStorage.setItem('isDidRouteLeave', 0)
	          }, 100)
	        },
	        onCancel: () => {
	          window.localStorage.setItem('isShowRouteLeaveMessage', 0)
	          window.localStorage.setItem('isDidRouteLeave', 0)
	        },
	      });
	    }
	    return false
	  }
	  window.localStorage.setItem('isDidRouteLeave', 0)
	  return true
	},
	componentDidMount() {
	  this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
	},



## 定位处理

  // 检测导航定位处理
  checkFixedNav = () => {
    // const eleBox = document.querySelector('#sideNavBox')
    // const eleFixed = document.querySelector('.expand-menu-wrapper')
    // const eleMainHead = document.querySelector('.main-top')
    // const headHeight = eleMainHead ? eleMainHead.clientHeight : 0
    // const scrollTop = document.body.scrollTop || document.documentElement.scrollTop

    // console.log('checkFixedNav', scrollTop)

    // if (eleFixed) {
    //   if (scrollTop > 0) {
    //     if (!eleBox.classList.contains('is-fixed')) {
    //       eleBox.classList.add('is-fixed')
    //       eleFixed.style.position = 'fixed'
    //       eleFixed.style.top = headHeight + 'px'
    //     }
    //   } else {
    //     eleBox.classList.remove('is-fixed')
    //     eleFixed.style.position = 'static'
    //     eleFixed.style.top = '0px'
    //   }

    //   if (scrollTop === 0) {
    //     eleFixed.scrollTo(0, 0)
    //   }
    // }
  }

