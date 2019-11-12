import {Component} from 'react'

import axios from 'axios'

// 导入基准路径
import { BASEURL } from './url'

//设置基准地址
axios.defaults.baseURL = BASEURL

// 把axios 挂载到组件的原型上
Component.prototype.http = axios

// console.log(Component.prototype) // 测试