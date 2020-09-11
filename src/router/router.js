import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用router
Vue.use(VueRouter);
// 首页路由
import home from "@/components/home.vue";
// 商品路由
import wiring from "@/components/eightRattle/wiring.vue";
import wiringDetail from '@/components/detail/wiringDetail.vue'
import wiringDetailLunbo from '@/components/detail/wiringDetail.vue'
// 新闻路由
import news from "@/components/eightRattle/news.vue";
import newsDetail from '@/components/detail/newsDetail.vue'

// 美图赏析路由
import photo from '@/components/eightRattle/photo.vue';





// 购物车页面路由
import shoppingcar from "@/components/shoppingcar.vue";


// 个人中心路由
import user from "@/components/user.vue";
// 登录页面
import login from '@/components/users/login.vue';
import register from '@/components/users/register.vue';
import addressManager from '@/components/address/addressManager.vue';
import addressadd from '@/components/address/addressadd.vue';
import addressEdit from '@/components/address/addressEdit.vue';
import order from '@/components/order/order.vue';




var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/shoppingcar',component:shoppingcar},
        {path:'/user',component:user},
        {path:'/wiring',component:wiring},
        {path:'/newslist',component:news},
        {path:'/wiringDetail/:id',component:wiringDetail},
        {path:'/wiringDetailLunbo/:id',component:wiringDetailLunbo},
        {path:'/newsDetail/:id',component:newsDetail ,props:true},
        {path:'/photo',component:photo},
        {path:'/login',component:login},
        {path:'/register',component:register},
        {path:'/addressManager',component:addressManager},
        {path:'/addressadd',component:addressadd},
        {path:'/addressEdit/:addressInfo',component:addressEdit},
        {path:'/order',component:order},
        
        
    ]
});

export default router;