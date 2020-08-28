

// 这里我们封装封装一个axios的实例
import axios from "axios";

const instance = axios.create({
    baseURL: 'http://api.w0824.com/api'
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {

    return response.data;
}, function (error) {
    return Promise.reject(error);
});


export default instance;
