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

// 获取八宫格的新闻列表(新闻头条数据)
export async function getNewsListData(page=1,pagesize=5){
    return await instance.get( `/getnewslist?page=${page}&pagesize=${pagesize}`);
}
// 获取八宫格的新闻详情列表(新闻头条详情数据)
export async function getNewsListDetailData(id){
    return  await instance.get(`/getnew/${id}`);
}

// 获取八宫格的商品列表（商品数据）
export async function getWiringData(pageindex=1){
    return await instance.get( `/getgoods?pageindex=${pageindex}`);  
}
// 获取商品详情页面信息
export async function getWiringDetailDate(id){
    return await instance.get( `/getgoodsinfo/${id}`);
}

// 获取商品详情轮播信息
export async function getWiringDetailLunboDate(id){
    return await instance.get( `/getthumbimages/${id}`);
}
// 获取文章评论的数据 getcomments/13?pageindex=3
export  async  function getNewsComment(id,page){
    return  await instance.get(`/getcomments/${id}?pageindex=${page}`);
}


// // 发布文章评论 postcomment/:id
export  async  function postCommentData(id){
    return  await instance.post(`/postcomment/${id}`);
}

