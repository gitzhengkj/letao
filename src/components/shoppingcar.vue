<template>
  <div class="shoppingCar">
    <div class="shoppingList"></div>
    <h3>
      亲，您的购物车为空，去
      <a href>首页</a>
      逛逛吧！
    </h3>
    <hr />
    <div class="img">
      <img src="http://vue.w0824.com/img/car.82e0a37b.png" alt />
    </div>
    <div class="text"><a href="">登录</a>后可以同步电脑与手机购物车中的商品 </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    this.$parent.title = "购物车";
  },
};
</script>

<style lang="scss" scoped>
body{
    background-color: #F1F1F1;
}
.shoppingCar {
  .shoppingList {
    padding: 10px 5px;
  }
  h3 {
    font-weight: bold;
    display: block;
    font-size: 18.72px;
    color: #333;
    text-align: center;
  }

  .img{
      display: flex;
      justify-content: center;
  }
  .text{
      display: flex;
      justify-content: center;
      color: #333;
  }
}
</style>