
// 很多连接线都是相同设置的情况下，可以将配置抽离出来，作为一个单独的变量，作为connect的第二个参数传入。
// 实际上connect的第二个参数会和第一个参数merge，作为一个整体。
var commonConfig = {
  // 是否可以拖动（作为连线起点）
  isSource: true,
  // 是否可以放置（连线终点）
  isTarget: true,
  // 设置连接点最多可以连接几条线
  // -1不限制，默认限制一条线
  maxConnections: -1,
  // 设置锚点位置，按照[target, source]的顺序进行设置
  // 可以有 Bottom Top Right Left四种方位
  // 还可以是BottomLeft BottomRight BottomCenter TopLeft TopRight TopCenter LeftMiddle RightMiddle的组合
  // 默认值 ['Bottom', 'Bottom']
  // anchor: ['Bottom', 'Bottom'],
  // 端点类型，形状（区分大小写），Rectangle-正方形 Dot-圆形 Blank-空
  endpoint: ['Dot', {
    radius: 4,
  }],
  // 设置端点的样式
  endpointStyle: {
    fill: '#456', // 填充颜色
    outlineStroke: 'blank', // 边框颜色
    outlineWidth: 0, // 边框宽度
  },
  // 设置连接线的样式 Bezier-贝瑟尔曲线 Flowchart-流程图 StateMachine-弧线 Straight-直线
  connector: ['Flowchart'],
  // 设置连接线的样式
  connectorStyle: {
    stroke: '#456', // 实线颜色
    strokeWidth: 3, // 实线宽度
    outlineStroke: 'blank', // 边框颜色
    outlineWidth: 2, // 边框宽度
  },
  // 设置连接线悬浮样式
  connectorHoverStyle: {
    stroke: 'lightblue', // 实线颜色
  },
  // 设置连接线的箭头
  // 可以设置箭头的长宽以及箭头的位置，location 0.5表示箭头位于中间，location 1表示箭头设置在连接线末端。 一根连接线是可以添加多个箭头的。
  connectorOverlays: [
    ['Arrow', {
        width: 10,
        length: 10,
        location: 0.8
    }],
    ['Arrow', {
        width: 10,
        length: 10,
        location: 0.2
    }],
    ['Label', {
      label: '',
      cssClass: '',
      labelStyle: {
        color: 'red'
      },
      events: {
        click: function (labelOverlay, originalEvent) {
          console.log('点击连接线的文字内容', labelOverlay, originalEvent)
        }
      }
    }]
  ]
}

jsPlumb.ready(function () {
  // 常用量设置
  const containerSelector = '#diagramContainer'
  const visoSelector = '#operate .viso-item'

  // 绑定删除连接线的操作处理
  bindDeleteConnection()

  // 绑定保存数据的操作数据
  bindSaveData()

  // 绑定清除数据的操作数据
  bindClearData()

  // 绑定加载数据的操作数据
  bindLoadData()

  // 设置绘图容器
  jsPlumb.setContainer('diagramContainer')

  // 可以使用importDefaults，来重写某些默认设置
  jsPlumb.importDefaults({
    ConnectionsDetachable: false, // 一般来说拖动创建的连接，可以再次拖动，让连接断开。如果不想触发这种行为，可以设置。
  })

  // 设置拖拉
  $(visoSelector).draggable({
    helper: 'clone',
    scope: 'ss',
  })

  // 放置拖拉
  $(containerSelector).droppable({
    scope: 'ss',
    drop: function (event, ui) {
      const left = parseInt(ui.offset.left - $(this).offset().left)
      const top = parseInt(ui.offset.top - $(this).offset().top)
      const type = ui.helper.attr('data-type')
      const id = `${type}${new Date().valueOf()}`

      // 附加节点
      $(this).append(`
        <div id="${id}"
          class="viso-item viso-${type}"
          style="position: absolute; left: ${left}px; top: ${top}px;"
        >
          ${ui.helper.html()}
        </div>
      `)

      // 设置默认表现
      setDefault(id)
    }
  })

  // 设置默认表现
  function setDefault(id) {
    setDraggable(id)
    addEndpoint(id)
  }

  // 设置指定节点可拖动
  function setDraggable(id) {
    jsPlumb.draggable(id, {
      containment: 'parent', // 限制节点的拖动区域
      grid: [10, 10], // 设置网格
    })
  }

  // 给指定节点添加端点
  function addEndpoint(id) {
    jsPlumb.addEndpoint(id, {anchors: 'Left'}, commonConfig)
    jsPlumb.addEndpoint(id, {anchors: 'Right'}, commonConfig)
    jsPlumb.addEndpoint(id, {anchors: 'Top'}, commonConfig)
    jsPlumb.addEndpoint(id, {anchors: 'Bottom'}, commonConfig)
  }

  // 绑定删除连接线的操作处理
  function bindDeleteConnection() {
    jsPlumb.bind('dblclick', function (connection, originalEvent) {
      if (window.confirm('确定删除所点击的连接线吗？')) {
        // 删除指定连接线
        jsPlumb.deleteConnection(connection)
      }
    })
  }

  // 绑定保存数据的操作数据
  function bindSaveData() {
    $('#saveData').on('click', function() {

    })
  }

  function getNodeList() {
    const $viso = $(containerSelector).find('.viso-item')
  }

  // 绑定清除数据的操作数据
  function bindClearData() {
    $('#clearData').on('click', function() {

    })
  }

  // 绑定加载数据的操作数据
  function bindLoadData() {
    $('#loadData').on('click', function() {

    })
  }
})