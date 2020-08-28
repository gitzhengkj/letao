// 封装一个模块，用于定义各种请求的方法


import instance from './config.js';

// 获取轮播图
export  async  function getLunBoData(){
    return  await instance.get('/getlunbo');
}

// 获取首页推荐商品
export async function getRecommendData(limit = 8){
    return await instance.get( `/recommend?limit=${limit}`);
}


