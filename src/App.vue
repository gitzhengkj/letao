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
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车" badge="12" to="/shoppingcar"  />
          <van-goods-action-button color="#FF9418" type="warning" text="加入购物车"   />
          <van-goods-action-button color="#FD5632" type="danger" text="立即购买" />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Search,
  Tabbar,
  TabbarItem,
  Sticky,
  NavBar,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
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
  components: {
    Search,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem,
    "van-sticky": Sticky,
    "van-nav-bar": NavBar,
    "van-goods-action":GoodsAction,
    "van-goods-action-icon":GoodsActionIcon,
    "van-goods-action-button":GoodsActionButton
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
