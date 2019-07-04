import React, { Component } from 'react';
import { Select, Icon } from 'antd';
import { Map, Marker } from 'react-amap';

import CountMap from '../../public/component/CountMap'
import SortBar from '../../public/component/SortBar';
import { HorizontalAlign } from '../../public/component/RoomDetails';
import './index.less';

const loadingStyle = {
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
const Loading = <div style={loadingStyle}>Loading Map...</div>

const styleA = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  padding: '5px 10px',
  border: '1px solid #d3d3d3',
  backgroundColor: '#f9f9f9'
}

const MyMapComponent = function (props) {
  const map = props.__map__;
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }

  const wrapperStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '5px',
    border: '1px solid #333'
  }

  const spanStyle = {
    display: 'inline-block',
    height: '30px',
    lineHeight: '30px',
    width: '30px',
    textAlign: 'center',
    borderRadius: '50%',
    margin: '0 5px',
    cursor: 'pointer',
    background: '#333',
    color: '#fff',
    fontSize: '16px',
    border: '1px solid #333'
  }
  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  return (
    <div style={wrapperStyle} id="zoom-ctrl">
      <span style={spanStyle} onClick={zoomIn}>+</span>
      <span style={spanStyle} onClick={zoomOut}>-</span>
    </div>
  )
}



export default class HouseOnMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectPrice: '0',
      selectMode: '0',
      selectRoom: '0',
      findNums: 233,
      horizontalAlignData: [
        {
          id: '0',
          // img: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
          title: '浦东新区-张江新村',
          roomType: '1室1厅',
          flatsName: '浦东新区  V领地公寓上海大学宝山校区城银路店',
          position: '距2号线金科路地铁站800米，步行约7分钟',
          price: '1900',
          square: '25m',
          info: ['独栋公寓', '独立卫浴', '独立卫浴']
        },
        {
          id: '1',
          img: 'https://image1.ljcdn.com/310000-inspection/32d3d78f-57fd-4feb-8a4a-272eaad37364.jpg.600x450.jpg',
          title: '浦东新区-张江新村',
          roomType: '1室1厅',
          position: '距2号线金科路地铁站800米，步行约7分钟',
          price: '1900',
          square: '25m',
          flatsName: '浦东新区  V领地公寓上海大学宝山校区城银路店',
          info: ['独栋公寓', '独立卫浴', '独立卫浴']
        },
        {
          id: '2',
          img: 'https://image1.ljcdn.com/310000-inspection/32d3d78f-57fd-4feb-8a4a-272eaad37364.jpg.600x450.jpg',
          title: '浦东新区-张江新村',
          roomType: '1室1厅',
          position: '距2号线金科路地铁站800米，步行约7分钟',
          price: '1900',
          square: '25m',
          flatsName: '浦东新区  V领地公寓上海大学宝山校区城银路店',
          info: ['独栋公寓', '独立卫浴', '独立卫浴']
        }
      ],
      mapData: [
        {
          position: [120.1, 31],
          label: '北京',
          count: 150
        },
        {
          position: [120.15, 31],
          label: '上海',
          count: 150
        },
        {
          position: [120.2, 31],
          label: '广东',
          count: 150
        }
      ],
      center: { longitude: 115, latitude: 30 }
    };
  }

  // 排序变更的回调函数
  handleSortBarClick = (sortIdx, sortType) => {
    console.log(sortIdx, sortType)
  }

  // 选择价格
  handleSelectPrice = value => {
    this.setState({
      selectPrice: value
    });
  };

  // 选择房型
  handleSelectRoom = value => {
    this.setState({
      selectRoom: value
    });
  };

  // 选择出租方式
  handleSelectMode = value => {
    this.setState({
      selectMode: value
    });
  };

  // 清空筛选
  handleClearSelect = () => {
    this.setState({
      selectPrice: '0',
      selectMode: '0',
      selectRoom: '0'
    });
  };

  // 变更范围
  changeCenter = () => {
    this.setState({
      center: {
        longitude: 115 + Math.random() * 10,
        latitude: 30 + Math.random() * 10,
      }
    });
  };

  showCenter = () => {
    this.setState({
      centerInfo: `${this.mapInstance.getCenter()}`
    });
  }

  render() {
    // console.log(window.mapZoom);
    const { selectPrice, selectRoom, selectMode } = this.state;
    const Option = Select.Option;

    // 地图插件
    const plugins = [
      // 'MapType',
      // 'Scale',
      // 'OverView',
      'ControlBar',
      // {
      //   name: 'ToolBar',
      //   options: {
      //     visible: true, // 不设置该属性默认就是 true
      //     onCreated(ins) {
      //       console.log(ins);
      //     },
      //   },
      // }
    ]

    // 地图事件
    const events = {
      created: (map) => {
        this.mapInstance = map;
        this.showCenter();
        console.log('地图实例：', map)
      },
      click: () => {
        console.log('You Clicked The Map')
      },
      moveend: () => { this.showCenter() }
    }

    return (
      <div className="house-on-map">
        <span className="total-title">为您找到约{this.state.findNums}套房</span>
        <div className="content-wrap">
          <div className="content-filter">
            <SortBar sortBarClick={this.handleSortBarClick} />
            <div className="select-bar">
              <div className="item">
                <span className="label">租金</span>
                <Select value={selectPrice} style={{ width: 132 }} onChange={this.handleSelectPrice} >
                  <Option value="0">全部价格</Option>
                  <Option value="1">1000以下</Option>
                  <Option value="2">1000-2000</Option>
                  <Option value="3">2000-3000</Option>
                  <Option value="4">3000-4000</Option>
                  <Option value="5">4000-5000</Option>
                  <Option value="6">5000以上</Option>
                </Select>
              </div>
              <div className="item">
                <span className="label">方式</span>
                <Select value={selectMode} style={{ width: 120 }} onChange={this.handleSelectMode}>
                  <Option value="0">合租/整租</Option>
                  <Option value="1">整租</Option>
                  <Option value="2">合租</Option>
                </Select>
              </div>
              <div className="item">
                <span className="label">房型</span>
                <Select value={selectRoom} style={{ width: 115 }} onChange={this.handleSelectRoom}>
                  <Option value="0">不限</Option>
                  <Option value="1">一室</Option>
                  <Option value="2">两室</Option>
                  <Option value="3">三室</Option>
                  <Option value="4">四室</Option>
                  <Option value="5">四室以上</Option>
                </Select>
              </div>
              <div className="clear-select" onClick={this.handleClearSelect} onKeyPress={this.handleClearSelect} >
                <Icon type="delete" />清空
              </div>
            </div>
          </div>
          <div className="content-main">
            <div className="side">
              {this.state.horizontalAlignData.map((v, i) => {
                return <HorizontalAlign isFlats key={v.id} data={v} />;
              })}
            </div>
            <div className="cont">
              {/* <CountMap mapData={this.state.mapData} /> */}
              <div style={{ width: '100%', height: '400px' }}>
                <Map
                  amapkey="788e08def03f95c670944fe2c78fa76f"
                  viewMode="3D"
                  center={this.state.center}
                  plugins={plugins}
                  events={events}
                  loading={Loading}
                >
                  <MyMapComponent />
                  <div className="customLayer" style={styleA}>
                    <h4>A Custom Layer</h4>
                    <p>Current Center Is: {this.state.centerInfo}</p>
                  </div>
                </Map>
              </div>
              <button onClick={this.changeCenter}>变更范围</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
