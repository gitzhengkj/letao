import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用router
Vue.use(VueRouter);

import home from "@/components/home.vue";
import shoppingcar from "@/components/shoppingcar.vue";
import user from "@/components/user.vue";
import wiring from "@/components/eightRattle/wiring.vue";
import news from "@/components/eightRattle/news.vue";
import wiringDetail from '@/components/detail/wiringDetail.vue'
import wiringDetailLunbo from '@/components/detail/wiringDetail.vue'
import newsDetail from '@/components/detail/newsDetail.vue'


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
        
    ]
});

export default router;