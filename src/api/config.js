

// 这里我们封装封装一个axios的实例
import axios from "axios";
import { Toast } from "vant";
import store from '@/store/carStore.js'

import router from '@/router/router.js'

const instance = axios.create({
    baseURL: 'http://api.w0824.com/api'
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {


    var token = localStorage.getItem('token') || '';
    token && (config.headers.token = token)

    // 设置对应的loading
    !store.state.isPending && store.commit('changeIsPending',true)
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {

     // 设置对应的loading
     store.commit('changeIsPending',false)
    return response.data;
}, function (error) {
    store.commit('changeIsPending',false)
    var status = error.response.status;
    switch (status) {
        case 401:
            Toast('登录已过期，重新登录');
            router.push('/login');
            break;
    
        default:
            Toast('网络繁忙，请稍后重试');
    }

    // return Promise.reject(error);
});


export default instance;
