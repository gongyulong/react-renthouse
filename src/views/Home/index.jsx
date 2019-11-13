import React, { Component } from 'react'

// 导入路由
import { Link } from 'react-router-dom'

// 导入antd
import { Carousel, Flex, Grid } from 'antd-mobile'

// 导入基地址
import { BASEURL } from '../../utils/url'

// 导入样式
import styles from './index.module.scss'

// 通过模块化的方式导入本地图片
import image1 from '../../assets/images/nav-1.png'
import image2 from '../../assets/images/nav-2.png'
import image3 from '../../assets/images/nav-3.png'
import image4 from '../../assets/images/nav-4.png'

// 导入子组件
import SearchHeader from '../../components/SearchHeader'

export default class index extends Component {
  constructor() {
    super()
    this.state = {
      SwitperData: null, //  轮播图数据
      imgHeight: 176,    //  轮播图高度
      news: null,        //  咨询
      cityName: '北京'   //  城市
    }
  }
  // 导航菜单
  navs = [
    { icon: image1, text: '整租', path: '/layout/houselist' },
    { icon: image2, text: '合租', path: '/layout/houselist' },
    { icon: image3, text: '地图找房', path: '/map' },
    { icon: image4, text: '去出租', path: '/rent/add' }
  ]
  
  componentDidMount() {
    // 1.0 获取轮播图数据
    this.getSwitperData()
    // 2.0 获取租房小组数据
    this.getGroupsData()
    // 4.0 获取咨询的数据
    this.getNewsData() 
  }

  // 1.0 获取轮播图数据
  getSwitperData = async () => {
    const res = await this.http.get('/home/swiper')
    // console.log(res)
    this.setState({
      SwitperData: res.data.body
    })
  }

  // 2.0 获取租房小组数据
  getGroupsData = async () => {
    const res = await this.http.get('/home/groups?area=AREA%7C88cff55c-aaa4-e2e0')
    //  console.log(res)
    this.setState({
        rentGrops: res.data.body
    })
    //  console.log(this.state.rentGrops)
  } 

  // 4.0 获取咨询的数据
  getNewsData = async () => {
    const res = await this.http.get('/home/news?area=AREA%7C88cff55c-aaa4-e2e0')
    // console.log(res)
    this.setState({
        news: res.data.body
    })
  //  console.log(this.state.news)
} 

  // 1.1 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel autoplay infinite className={styles.swiper}>
        {this.state.SwitperData.map(item => (
          <a
            key={item.id}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`${BASEURL}${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }

  // 2.1 渲染租房小组
  renderGroup = () => {
    return (
      <div className={styles.groups}>
          <Flex>
            <Flex.Item>
              <span className={styles.title}>租房小组</span>
            </Flex.Item>
            <Flex.Item align="end">
              <span>更多</span>
            </Flex.Item>
          </Flex>

          {/* 宮格 */}
          <Grid data={this.state.rentGrops}
            columnNum={2}
            hasLine = {false}
            square = {false}
            renderItem={dataItem => (
                <div className={ styles.navItem }>
                    {/* 左 */}
                    <div className={ styles.left }>
                      <p>{dataItem.title}</p>
                      <p>{dataItem.desc}</p>
                    </div>
                    {/* 右 */}
                    <div className={ styles.right }>
                      <img src={`${BASEURL}${dataItem.imgSrc}`} alt="" />
                    </div>
                </div>
            )}
          />
      </div>
    )
  } 

  // 3.0 渲染导航菜单
  renderNavs = () => {
    return (
      <Flex className={styles.nav}>
        {this.navs.map(item => {
          return (
            <Flex.Item key={item.text}>
              <Link  to={item.path}>
                <img src={item.icon} alt="" />
                <p>{item.text}</p>
              </Link>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  }

  // 4.1 渲染咨询
  renderNews = () => {
    return <div className={styles.news}>
      <h3 className={styles.groupTitle}>最新咨询</h3>
      {
        this.state.news.map(item => {
          return <div className={styles.newsItem} key={item.id}>
            <div className={styles.imgWrap}>
              <img src={`${BASEURL}${item.imgSrc}`} alt=""/>
            </div>
            <Flex className={styles.content} direction="column" justify="between">
              <h3 className={styles.title}>{item.title}</h3>
              <Flex justify="between" className={styles.info}>
                <span>{item.from}</span>
                <span>{item.date}</span>
              </Flex>
            </Flex>
          </div>
        })
      }
    </div>
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 渲染搜索头部 */}
        {<SearchHeader cityName={this.state.cityName}/>}

        {/* 渲染轮播图 */}
        {this.state.SwitperData && this.renderSwiper()}

        {/* 渲染导航菜单 */}
        { this.renderNavs() }

        {/* 渲染租房小组 */}
        {this.state.rentGrops && this.renderGroup()}

         {/* 渲染咨询 */}
        {this.state.rentGrops && this.renderNews()}
      </div>
    )
  }
}
