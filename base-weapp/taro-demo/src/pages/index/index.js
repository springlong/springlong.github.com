import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import Panel from '../../components/panel'
import './index.less'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))

class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props);

    this.state = {
      name: 'WePY',
      desc: '让小程序支持组件化开发的框架，一个最受欢迎的小程序框架.',
      list: [
        {
          title: '三体 （刘慈欣著科幻小说）',
          cont: '《三体》是刘慈欣创作的系列长篇科幻小说，由《三体》、《三体Ⅱ·黑暗森林》、《三体Ⅲ·死神永生》组成，第一部于2006年5月起在《科幻世界》杂志上连载，第二部于2008年5月首次出版，第三部则于2010年11月出版。'
        },
        {
          title: '星际迷航 （科幻影视系列作品）',
          cont: '《星际迷航》（Star Trek，又译作《星际旅行》等）是由美国派拉蒙影视制作的科幻影视系列，由6部电视剧、1部动画片、13部电影组成。该系列最初由编剧吉恩·罗登贝瑞（Gene Roddenberry）于20世纪60年代提出，经过近50年的不断发展而逐步完善，成为全世界最著名的科幻影视系列之一。'
        }
      ]
    };
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', this.props, nextProps)
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
  }

  componentDidShow () {
    console.log('componentDidShow')
  }

  componentDidHide () {
    console.log('componentDidHide')
  }

  render () {
    const {name, desc, list} = this.state
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
        {/* 自定义组件测试 */}
        <Panel title={name}>
          {desc}
        </Panel>
        {
          list.map((item) => {
            return (
              <Panel title={item.title} key={item.title}>
                {item.cont}
              </Panel>
            )
          })
        }
      </View>
    )
  }
}

export default Index
