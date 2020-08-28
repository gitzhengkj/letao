<template>
  <div id="app">
    <!-- 头部 -->
    <van-sticky>
        <div class="header">
          <img id="headImg" src="./assets/logo.png" alt />
          <Search placeholder="请输入搜索关键词"></Search>
        </div>
    </van-sticky>

    <!-- 中部 -->
    <router-view></router-view>
    <!-- 尾部 -->
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/shoppingcar" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的乐淘</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Search, Tabbar, TabbarItem, Sticky } from "vant";

export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    Search,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    "van-sticky" : Sticky
  },
};
</script>

<style lang='scss'>
#app {
  min-width: 320px;
  max-width: 750px;
  margin: auto;
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
