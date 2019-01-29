import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: true,
      showName: '收起',
      stateName: 'isShow',
    };
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', this.props, nextProps)
  }

  componentDidShow () {
    console.log('componentDidShow')
  }

  componentDidHide () {
    console.log('componentDidHide')
  }

  handleChangeView = () => {
    const isShow = !this.state.isShow
    this.setState({
      isShow,
      showName: isShow ? '收起' : '展开',
      stateName: isShow ? 'isShow' : 'isHide',
    })
  }

  render () {
    const {className, title} = this.props
    const {showName, stateName} = this.state

    return (
      <View className={`panel ${className || ''}`}>
        <View className='panel-title'>
          <View className='panel-title-value'>
            {title || 'Title'}
          </View>
          <View className='panel-title-extra'>
            <Text onClick={this.handleChangeView}>{showName}</Text>
          </View>
        </View>
        <View className={`panel-content ${stateName || ''}`}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default Panel
