import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用router
Vue.use(VueRouter);

import home from "@/components/home.vue";
import shoppingcar from "@/components/shoppingcar.vue";
import user from "@/components/user.vue";

var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/shoppingcar',component:shoppingcar},
        {path:'/user',component:user},
    ]
});

export default router;