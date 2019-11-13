import React from 'react'
// 导入校验规则
import PropTypes from 'prop-types'

// 导入样式
import styles from './index.module.scss'

// 导入antd
import { Flex } from 'antd-mobile'

// 路由的高阶组件
import { withRouter } from 'react-router-dom'

function SearchHeader({ cityName, history }) {
    return <div className={styles.root}>
    <Flex>
      <Flex
        className={styles.searchLeft}
        onClick={() => history.push('/citylist')}
      >
        <div className={styles.location}>
          <span>{cityName}</span>
          <i className="iconfont icon-arrow"></i>
        </div>
        <div className={styles.searchForm}>
          <i className="iconfont icon-search"></i>
          <span>请输入小区或是地址</span>
        </div>
      </Flex>
      <i
        onClick={() => history.push('/map')}
        className="iconfont icon-map"
      ></i>
    </Flex>
  </div>
}

// 效验规则
SearchHeader.prototype = {
    cityName: PropTypes.string.isRequired
}

export default withRouter(SearchHeader)