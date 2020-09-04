<template>
  <div class="all">
    <div class="box1">
      <div class="img">
        <img src="http://vue.w0824.com/img/logo.c0057232.png" alt />
      </div>
      <div class="text">用户名: zkj</div>
    </div>

    <div class="box2">
      <van-cell title="修改密码" is-link />
      <van-cell title="我的订单" is-link />
      <van-cell title="地址管理" is-link />
    </div>

    <div class="box3">
         <van-cell title="提交反馈" is-link />
         <van-cell title="关于乐淘" value="v1.0.0" size="large" />
         <van-cell value="内容" />
    </div>

    <div class="footer">
        <van-button class="van-button" type="primary"    block>退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { Cell,Button  } from "vant";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    this.$parent.title = "个人中心";
    this.$parent.bool = false;
    this.$parent.bool2 = false;
  },
  components: {
    "van-cell": Cell,
    "van-button" :Button
  },
};
</script>

<style lang="scss" scoped>
.all {
  height: 620px;
  background-color: #eee;
  background-color: #f1f1f1;
  .box1 {
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 10px 16px;
    .img {
      box-sizing: border-box;
      width: 70px;
      height: 70px;

      color: #323233;
      font-size: 14px;
      line-height: 24px;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      margin: auto;
      font-size: 18px;
      color: #5d5555;
    }
  }
  .box2{
      margin-bottom: 20px;
  }
  .footer {

      width: 100%;
      position: fixed;
      bottom: 0px;
    .van-button{
        color:black;
        background-color: #fff;
        border: 0px;


    }
      
      
  }
}
</style>