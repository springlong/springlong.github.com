
  // IOS9以及后续版本不再支持使用iframe打开scheme链接
  // 使用打开app造成timeout延迟的方法来判断app是否打开已经失效，
  // 在较新版本的浏览器和手机系统中，打开app，以及打开app时的提醒弹窗，将不再阻塞timeout的执行
  const OpenApp = {
    open: function (options) {
      const opts = Object.assign({
        // 安卓的打开链接
        androidAppUrl: '',
        // 安卓的下载链接，开启第三方下载url时无效
        androidDownloadUrl: '',
        // 安卓使用第三方下载url
        androidThirdUrl: '',
        // IOS的打开链接
        iosAppUrl: '',
        // IOS的下载链接
        iosDownloadUrl: '',
        // IOS使用Universal Links(通用链接)
        // 这是iOS9推出的一项功能
        iosUniversalLink: '',
      }, options)

      const userAgent = navigator.userAgent
      const isAndroid = /Android/i.test(userAgent)
      const isIOS = /iPhone|iPad|iPd/i.test(userAgent)

      let openUrl = ''
      let downUrl = ''

      if (isIOS) {
        openUrl = opts.iosUniversalLink || opts.iosAppUrl || ''
        downUrl = opts.iosDownloadUrl || ''
      } else if (isAndroid) {
        openUrl = opts.androidAppUrl || ''
        downUrl = opts.androidThirdUrl || opts.androidDownloadUrl || ''
      } else {
        downUrl = opts.androidThirdUrl || ''
      }

      if (openUrl) {
        this.trigger(openUrl, downUrl)
      } else if (downUrl) {
        window.location.href = downUrl
      }
    },
    trigger: function (openUrl, downUrl) {
      this.check((isOpened) => {
        if (!isOpened) {
          window.location.href = downUrl
        }
      })
      window.location.href = openUrl
    },
    check: function (callback) {
      const startTime = +new Date()
      const endTime = startTime + 3000

      const timerId = setInterval(() => {
        const hidden = document.hidden || document.webkitHidden || false
        if (+new Date() > endTime || hidden) {
          clearInterval(timerId)
          callback(hidden)
        }
      }, 100)
    },
    clickByTag(url, target) {
      const ele = document.createElement('a')
      ele.innerHTML = 'adsfasd'
      ele.setAttribute('href', url)
      ele.setAttribute('target', target || '_self')
      ele.style.display = 'none'
      document.body.appendChild(ele)

      const objEvent = document.createEvent('MouseEvents')
      objEvent.initMouseEvent('click', true, false)
      ele.dispatchEvent(objEvent)
    }
  }