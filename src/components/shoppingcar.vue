<template>
  <div class="shoppingCar">
    <!-- 购物车有商品时 -->
    <div class="shoppingList" v-if="hasGoods">
      <van-divider :style="{ color: '#A1A6AD', borderColor: '#A1A6AD', padding: '0 16px' }">收货地址</van-divider>
      <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" />
      <van-divider :style="{ color: '#A1A6AD', borderColor: '#A1A6AD', padding: '0 16px' }">购买的商品</van-divider>
      <!-- 商品列表 -->
      <div class="shop" v-for="(item,index) in carData" :key="item.id">
        <div class="button">
          <!-- 开关 -->
          <van-switch
            @change="switchChange(item.id,$store.getters.getGoodsSelected[item.id])"
            v-model="$store.getters.getGoodsSelected[item.id]"
          />
        </div>
        <div class="img">
          <!-- 图片 -->
        </div>
        <div class="text-price-num-del">
          <div class="text">{{item.title}}</div>
          <div class="price-num-del">
            <div class="price">￥{{item.sell_price}}</div>
            <van-stepper
              class="num"
              @change="changeNumber(item.id,$store.getters.getGoodsNumber[item.id])"
              v-model="$store.getters.getGoodsNumber[item.id]"
            />
            <van-button
              class="del"
              size="small"
              @click="del(item.id,index)"
              style="background-color:red"
            >删除</van-button>
          </div>
        </div>
      </div>
      <van-cell icon="cash-back-record" title="微信支付" />

      <!-- 提交订单操作 -->
      <van-submit-bar
        :price="$store.getters.getGoodsSelectedPrice"
        button-text="订单支付"
        @submit="onSubmit"
      >
        <template #default>共{{$store.getters.getGoodsSelectedNumber}}件商品</template>
        <template #tip>默认支持微信支付</template>
      </van-submit-bar>
    </div>

    <!-- 购物车没有商品时 -->
    <div class="nullShop" v-else>
      <h3>
        您的购物车没有商品，去
        <router-link to="/home">首页</router-link>逛逛吧
      </h3>
      <hr />
      <div class="img">
        <img src="http://vue.w0824.com/img/car.82e0a37b.png" alt />
      </div>
      <div class="text">
        <a href>登录</a>后可以同步电脑与手机购物车中的商品
      </div>
    </div>
  </div>
</template>

<script>
import { getCarData, isLogin, commitOrder } from "@/api/index.js";
import { userInfo, genOrderId } from "@/util/tool.js";
import {
  Divider,
  AddressList,
  Switch,
  Stepper,
  Button,
  Cell,
  SubmitBar,
} from "vant";
export default {
  data() {
    return {
      // value: 1,
      checked: true,

      carData: [],
      chosenAddressId: "1",
      list: [
        {
          id: 2,
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
      ],
    };
  },
  computed: {
    hasGoods: function () {
      return this.carData.length > 0;
    },
    number: function () {
      return this.$store.getters.getGoodsSelectedNumber;
    },
    total_price: function () {
      return this.$store.getters.getGoodsSelectedPrice;
    },
    goods_ids: function () {
      return this.$store.getters.getSelectedGoodsIds;
    },
  },
  methods: {
    // 提交订单并支付
    async onSubmit() {
      // 准备订单数据，校验
      var user = userInfo();
      if (user === false) {
        this.$router.push("/login");
      }
      // 调用后台接口
      var order_id = genOrderId(); //用户生成订单号
      var orderData = {
        user_id: user.id,
        order_id: order_id,
        address_id: this.list[0].id,
        total_price: this.total_price,
        number: this.number,
        goods_ids: this.goods_ids,
      };
      // 调用后台接口，获取支付url，用于唤醒微信支付
      var res = await commitOrder(orderData);
      console.log(res);
      var weixinUrl= res.data;
      
      location.href = weixinUrl;
      

      // 成功清空购物车
      localStorage.removeItem('carData');
    },

    async getCarGoods() {
      var ids = this.$store.getters.getGoodsIds;
      if (!ids) {
        return;
      }
      var { message } = await getCarData(ids);
      // console.log(message);
      this.carData = message;
    },
    // 删除购物车商品
    del(good_id, index) {
      // 调用vuex的mutations
      this.$store.commit("delCarGoods", good_id);
      this.carData.splice(index, 1);
    },
    // 更改按钮
    switchChange(goods_id, selected) {
      // 调用vuex
      this.$store.commit("changeGoodsSelected", { goods_id, selected });
    },
    //修改商品数量
    changeNumber(goods_id, number) {
      this.$store.commit("changeGoodsNumber", { goods_id, number });
    },
  },
  created() {
    // 检测是否有登录
    isLogin();
    this.$parent.title = "购物车";
    this.$parent.bool = false;
    this.$parent.bool2 = true;
    this.getCarGoods();
  },
  components: {
    "van-divider": Divider,
    "van-address-list": AddressList,
    "van-switch": Switch,
    "van-stepper": Stepper,
    "van-button": Button,
    "van-cell": Cell,
    "van-submit-bar": SubmitBar,
  },
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f1f1f1;
}
.shoppingCar {
  height: 620px;
  .van-address-list__bottom {
    visibility: hidden;
  }
  .van-address-list {
    padding: 12px;
  }
  .shoppingList {
    padding: 10px 10px;
    .shop {
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      widows: 100%;
      height: 85px;
      margin-bottom: 10px;
      .button {
        margin: auto 4px;
      }
      .img {
        margin: auto 3px;
        width: 50px;
        height: 50px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .text-price-num-del {
        margin: auto 0px;
        .text {
          margin: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .price-num-del {
          display: flex;
          justify-content: space-between;
          .price {
            margin: auto 7px;
            color: red;
            font-size: 16px;
            font-weight: 600;
          }
          .num {
            margin: auto 10px;
          }
          .del {
            border: 0px;
            margin-right: 10px;
          }
        }
      }
    }
    .van-cell {
      margin-top: 20px;
      border-radius: 10px;
    }
  }

  .nullShop {
    h3 {
      font-weight: bold;
      display: block;
      font-size: 18.72px;
      color: #333;
      text-align: center;
    }

    .img {
      display: flex;
      justify-content: center;
    }
    .text {
      display: flex;
      justify-content: center;
      color: #333;
    }
  }
}
</style>