<template>
  <div id="app">
    <!-- 头部 -->
    <van-sticky>
      <div class="header" v-if="bool">
        <img id="headImg" src="./assets/logo.png" alt />
        <Search placeholder="请输入搜索关键词"></Search>
      </div>

      <div v-else>
        <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="$router.go(-1)" />
      </div>
    </van-sticky>

    <!-- 中部 -->
    <router-view></router-view>
    <!-- 尾部 -->
    <div>
      <!-- 首页底部 -->
      <div v-if="bool2">
        <van-tabbar class="weibu" v-model="active">
          <van-tabbar-item @click.prevent="bool=true" to="/home" icon="wap-home-o">首页</van-tabbar-item>
          <van-tabbar-item @click.prevent="bool=false" to="/shoppingcar" icon="cart-o">购物车</van-tabbar-item>
          <van-tabbar-item @click.prevent="bool=false" to="/user" icon="user-o">我的乐淘</van-tabbar-item>
        </van-tabbar>
      </div>
      <!-- 购物车底部 -->
      <div v-else>
        
      </div>
    </div>
  </div>
</template>

<script>
// import { isLogin } from '@/api/index.js'
import {
  Search,
  Tabbar,
  TabbarItem,
  Sticky,
  NavBar,
 
} from "vant";

export default {
  data() {
    return {
      active: 0,
      title: "",
      bool: true,
      bool2: true,
    };
  },
  created(){
    // isLogin();
  },
  components: {
    Search,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    "van-sticky": Sticky,
    "van-nav-bar": NavBar,
    
  },
};
</script>

<style lang='scss'>
#app {
  background-color: #EEEEEE;
  min-width: 320px;
  max-width: 750px;
  margin: auto;
  height: 735px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 6px;
    background-color: #fff;
    #headImg {
      width: 40px;
      height: 40px;
    }
    .van-search {
      flex: 1;
    }
  }
}
</style>
