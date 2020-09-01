<template>
  <div class="detail">
    <!-- 轮播 -->
    <!-- <div class="lunbo">{{ wiringDetailList.id }}</div> -->
    <van-swipe class="my-swipe" :autoplay="3000" :indicator-color="color">
      <van-swipe-item v-for="item in wiringDetailLunboList" :key="item.img">
        <img class="lunboimg" v-lazy="item.src" />
      </van-swipe-item>
    </van-swipe>

    <!-- 文字简介 -->
    <div class="textDetail">
      <div class="goodName">
        <!-- <span>Apple iMac MF883CH/A 21.5英寸一体机电脑</span> -->
        <span>{{ wiringDetailList.title}}</span>
      </div>
      <!-- 分割线 -->
      <van-divider />
      <div class="price">
        <span class="marketprice">
          <del>市场价：¥{{wiringDetailList.market_price}}</del>
        </span>
        <span class="stopPrice">本店价：</span>
        <span class="value">￥{{wiringDetailList.sell_price}}</span>
      </div>
      <div class="goodNumber">
        <span>购买数量：</span>
        <van-stepper v-model="value" />
      </div>
    </div>
    <!-- 其他信息 -->
    <div class="textDetail">
      <div class="goodName">
        <!-- <span>Apple iMac MF883CH/A 21.5英寸一体机电脑</span> -->
      </div>
      <!-- 分割线 -->
      <van-divider :style="{ color: '#ccc', borderColor: '#ccc', padding: '0 16px' }">其他信息</van-divider>
      <div class="otherData">
        <p class="size">商品货号:{{wiringDetailList.goods_no}}</p>
        <p class="num">库存情况:{{wiringDetailList.stock_quantity}}件</p>
        <p class="time">上架时间:{{wiringDetailList.add_time | dateFormat("YYYY-MM-DD")}}</p>
      </div>
    </div>

    <div class="data">
      <van-divider :style="{ color: '#ccc', borderColor: '#ccc', padding: '0 16px' }">介绍</van-divider>
      <!-- <div>{{wiringDetailList.zhaiyao}}</div> -->
    </div>
    <div id="test" v-html="wiringDetailList.content"></div>
  </div>
</template>

<script>
import { getWiringDetailDate } from "@/api/index.js";
import { getWiringDetailLunboDate } from "@/api/index.js";
import { Divider, Stepper, Swipe, SwipeItem } from "vant";
export default {
  data() {
    return {
      color: "#ccc",
      value: 1,
      wiringDetailList: "",
      wiringDetailLunboList: [],
      // html:
    };
  },

  methods: {
    async getWiringDetailList() {
      var id = this.$route.params.id;
      var res = await getWiringDetailDate(id);
      this.wiringDetailList = res.message;
    },
    async getWiringDetailLunboList() {
      var id = this.$route.params.id;
      var res1 = await getWiringDetailLunboDate(id);
      this.wiringDetailLunboList = res1.message;
    },
  },
  created() {
    this.getWiringDetailList();
    this.getWiringDetailLunboList();
    this.$parent.title = "商品详情";
    this.$parent.bool = false;
    this.$parent.bool2 = false;
    // var id = this.$route.params.id;
    // console.log(id);
  },
  //   computed(){
  //       document.getElementById('test').innerHTML("");

  //   }
  components: {
    "van-divider": Divider,
    "van-stepper": Stepper,
    "van-swipe": Swipe,
    "van-swipe-item": SwipeItem,
  },
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fff;
}

.detail {
  padding: 5px 5px 50px 5px;
  background-color: #eeeeee;
  //   height: 1200px;
  .lunbo {
    margin: 0 auto;

    height: 240px;
    background-color: red;
    border-radius: 5px;
  }
  .textDetail {
    margin: 8px;
    border-radius: 5px;
    background-color: #fff;
    margin: 10px auto;

    height: 144px;
    .goodName {
      padding: 5px;

      span {
        font-size: 16px;
        color: #333333;
      }
    }
    .price {
      font-size: 16px;
      color: #333;
      margin-bottom: 15px;
      .marketprice {
        margin-right: 20px;
        margin-left: 5px;
      }
      .value {
        color: red;
        font-weight: 600;
      }
    }
    .goodNumber {
      display: flex;
      margin-left: 5px;
      span {
        font-size: 16px;
        color: #333;
      }
    }
    .otherData {
      p {
        margin: 0px;
        margin-left: 10px;
        font-size: 16px;
        color: #333;
      }
    }
  }

  .data {
    padding: 5px 5px 50px 5px;
    border-radius: 5px;
    // height: 1128px;
    // background-color: pink;
  }
}
#test {
  /deep/ img {
    width: 100% ;
  }
  /deep/ table{
    width: 100%;
    tbody{
      tr{
        td{
          img{
            width: 100%;
          }
        }
      }
    }
  }
}

.van-swipe-item {
  width: 365px;
  height: 240px;
  // background-color: #fff;
  .lunboimg {
    // width: 100%;
    height: 100%;
  }
}
</style>