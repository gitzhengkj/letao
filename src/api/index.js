// 封装一个模块，用于定义各种请求的方法
import instance from './config.js';

// 获取首页轮播图
export  async  function getLunBoData(){
    return  await instance.get('/getlunbo');
}
// 获取首页推荐商品
export async function getRecommendData(limit = 8){
    return await instance.get( `/recommend?limit=${limit}`);
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

// 获取八宫格的新闻列表(新闻头条数据)
export async function getNewsListData(page=1,pagesize=5){
    return await instance.get( `/getnewslist?page=${page}&pagesize=${pagesize}`);
}
// 获取八宫格的新闻详情列表(新闻头条详情数据)
export async function getNewsListDetailData(id){
    return  await instance.get(`/getnew/${id}`);
}
// 获取文章评论的数据 getcomments/13?pageindex=3
export  async  function getNewsComment(id,page){
    return  await instance.get(`/getcomments/${id}?pageindex=${page}`);
}
// 发布文章评论 postcomment/:id
export  async  function postCommentData(id){
    return  await instance.post(`/postcomment/${id}`);
}



// 获取美图赏析页面
export  async  function getPhotoCateData(){
    return  await instance.get(`/getcategory`);
}

// 获取美图赏析子页面`/getcatelist/${id}
export  async  function getPhotoCateChildrenData(id){
    return  await instance.get(`/getcatelist/${id}`);
}

// 获取美图赏析轮播`/getthumbimages/${id}
export  async  function getPhotoCateChildrenLunboData(id){
    return  await instance.get(`/getthumbimages/${id}`);
}

// 获取购物车商品的信息
export  async  function getCarData(ids){
    return  await instance.get(`/getshopcarlist/${ids}`);
}


// 获取用户(post请求)
export async function userLogin(data){
    return await instance.post(`/login`,data);
}

// 获取用户(post请求)
export async function userRegister(data){
    return await instance.post(`/register`,data);
}




export async function isLogin(){
    var token = localStorage.getItem('token');
    try{
        await instance.post(`/checktoken?token=${token}`);
    }catch(e){

    }
}

// 获取用户地址
export async function userAddressData(userid){
    // return await instance.get(`/getaddress/${userid}`);
      return await instance.get(`/getaddress/${userid}?v=${Math.random()}`)
}

// 添加用户信息
export async function  addUserAddressData (userid,addressInfo) {
    return await instance.post(`/addaddress/${userid}`,addressInfo)
}

// 删除用户收货地址
export async function  deleteUserAddressData (addessid) {
    return await instance.post(`/deladdress/${addessid}`)
}
// 编辑用户收货地址
export async function editUserAddressData(addressid,addressInfo){
    return await instance.post(`/updateaddress/${addressid}`,addressInfo);
}


// 提交订单接口
export async function  commitOrder (orderData) {
    console.log(orderData);
    return await instance.post(`/commitorder`,orderData)
}



// 获取用户的订单数据
export async function  userOrder (user_id) {
    return await instance.post(`/userorder/${user_id}`)
}