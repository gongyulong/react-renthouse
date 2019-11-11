import React, { Component } from 'react'

// 导入样式
import Styles from './index.module.scss'

// 导入路由
import { Route, Redirect } from 'react-router-dom'

// 导入TabBar
import { TabBar } from 'antd-mobile'

// 导入子组件
import Home from '../Home'
import HouseList from '../HouseList'
import Info from '../Info'
import My from '../My'

export default class index extends Component {
  constructor() {
    super()
    this.state = {
      selectedTab: '/layout/home'
    }
  }

  // tabs数组
  TABS = [
    {
      title: '首页',
      icon: 'icon-index',
      path: '/layout/home'
    },
    {
      title: '找房',
      icon: 'icon-findHouse',
      path: '/layout/houselist'
    },
    {
      title: '资讯',
      icon: 'icon-info',
      path: '/layout/info'
    },
    {
      title: '我的',
      icon: 'icon-my',
      path: '/layout/my'
    }
  ]

  // 内容变化 tabBar的选中状态就应该同步过来   
  componentDidUpdate(prevProps) {
    //   console.log('--------componentDidUpdate--------')
    //   console.log(prevProps)

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }

  // tabbar 渲染部分
  renderTabBar = () => {
    return (
      <TabBar tintColor="#0094ff" noRenderContent>
        {this.TABS.map(item => {
          return (
            <TabBar.Item
              title="item.title"
              key="item.path"
              icon={ <i className={`iconfont ${item.icon}`} /> }
              selectedIcon={ <i className={`iconfont ${item.icon}`} /> }
              selected={this.state.selectedTab === item.path}
              onPress={() => {
                // this.setState({
                //   selectedTab: 'item.path'
                // })
                // 切换路由，让上面的内容发生变化(解决连续点击同一路由出现警告的bug)
                if (this.state.selectedTab === item.path) return
                this.props.history.push(item.path)
              }}
            >
            </TabBar.Item>
          )
        })}
      </TabBar>
    )
  }

  render() {
    return (
      <div className={Styles.layout}>
        {/* 变化的部分，使用嵌套路由 */}
        <Route path="/layout/home" component={Home} />
        <Route path="/layout/houselist" component={HouseList} />
        <Route path="/layout/info" component={Info} />
        <Route path="/layout/my" component={My} />
        <Redirect exact from="/layout" to="/layout/home" />

        {/* tabBar */}
        <div className={ Styles.tabbar }>{this.renderTabBar()}</div>
      </div>
    )
  }

}
