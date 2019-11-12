import React, { Component } from 'react'

import { Button } from 'antd-mobile'



export default class index extends Component {

    componentDidMount() {
        // 获取轮播图数据
        this.getSwitperData()
    }

    // 获取轮播图数据
    getSwitperData = async () => {
        const res = await this.http.get('/home/swiper')

        console.log(res)
        
    }
    render() {
        return (
            <div>
                首页
                <Button type="primary">primary</Button>
            </div>
        )
    }
}
