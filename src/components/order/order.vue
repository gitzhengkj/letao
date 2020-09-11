<template>
  <div class="order">
    <van-tabs v-model="active">
      <van-tab v-for="list in tabsList" :key="list.status" :title="list.title">
        <van-card
          v-for="item in getOrderGoods(list.status)"
          :key="item.id"
          :price="item.total_price"
          :title="item.goods[0].title"
          :thumb="item.goods[0].thumb_path"
        >
          <template #tags>
            <div id="num">共 {{item.number}} 件商品</div>
            <van-tag plain type="danger">付款方式：{{item.pay_way}}</van-tag>
          </template>
          <template #footer>
            <van-button
              size="mini"
              :type="statusBtnStyle(item.status)"
            >{{ statusText(item.status) }}</van-button>
            <van-button size="mini" type="danger">联系客服</van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { isLogin, commitOrder, userOrder, getCarData } from "@/api/index.js";
import { userInfo } from "@/util/tool.js";
// 引入插件
import { Tab, Tabs, Card, Tag, Button } from "vant";
export default {
  data() {
    return {
      active: 0,
      Order: [],
      tabsList: [
        { title: "全部", status: "all" },
        { title: "未付款", status: "0" },
        { title: "已付款", status: "1" },
        { title: "完成", status: "2" },
      ],
    };
  },
  methods: {
    async getOrder() {
      // 获取当前登录的用户订单id
      var { id } = userInfo();
      var orderData = await userOrder(id);
      //   console.log(orderData);

      // 判断orderData是否是一个数组
      if (Array.isArray(orderData)) {
        // 如果是，就通过订单id去获取相对应的商品信息
        // 存放商品的数组
        var temp = [];
        orderData.map((v) => {
          temp.push(getCarData(v.goods_ids));
        });
        // console.log(temp);
        // 获取所有的商品信息
        var orderGoods = await Promise.all(temp);
        // console.log(orderGoods);
        // 然后在order中加一个商品的属性
        orderData.map((temp, index) => {
          temp.goods = orderGoods[index].message;
        });
        this.Order = orderData;
        // console.log(this.Order);
      } else {
        this.$toast(orderData.message);
      }
    },
    getOrderGoods(status) {
      //判断购买状态
      if (status == "all") {
        // 全部
        return this.Order;
      }
      var tempGoods = [];
      // 筛选出指定状态的订单
      this.Order.map((item) => {
        item.status == status && tempGoods.push(item);
      });

      return tempGoods;
    },

    statusText(status) {
      var statusTextMap = new Map();
      statusTextMap.set("0", "未付款");
      statusTextMap.set("1", "已付款");
      statusTextMap.set("2", "已完成");
      return statusTextMap.get(status.toString());
    },
    // 按钮样式
    statusBtnStyle(status) {
      var statusTextMap = new Map();
      statusTextMap.set("0", "danger");
      statusTextMap.set("1", "primary");
      statusTextMap.set("2", "default");
      return statusTextMap.get(status.toString());
    },
  },
  async created() {
    await isLogin();
    this.$parent.title = "我的订单";
    this.$parent.bool = false;
    this.$parent.bool2 = false;
    this.getOrder();
  },
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-card": Card,
    "van-tag": Tag,
    "van-button": Button,
  },
};
</script>

<style lang="scss" scoped>
.van-tabs__content {
  margin-bottom: 10px;
}
.order{
    #num {
        margin: 5px;
    }
}
</style>