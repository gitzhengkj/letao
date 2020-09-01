<template>
  <!-- 下拉刷新 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-pull-refresh v-model="isLoading"  success-text="刷新成功" @refresh="onRefresh">
    <div class="wiring">
        <div class="all"  v-for="item in wiringList" :key="item.id" @click="getwiringDetail(item.id)" >
          <div class="Img" >
            <img v-lazy="item.img_url" alt />
          </div>
          <div class="all2">
            <div class="text">{{ item.title }}</div>
            <div class="price">
              ￥{{item.sell_price}}
              <del>{{ item.market_price }}</del>
            </div>
            <div class="num">
              <div class="top">热卖中</div>
              <div class="num1">剩{{item.stock_quantity}}件</div>
            </div>
          </div>
        </div>
    </div>
    <!-- 下拉刷新 -->
  </van-pull-refresh>
      </van-list>
</template>

<script>
// 商品数据
import { getWiringData } from "@/api/index.js";
// 引入vant下拉刷新插件
import { PullRefresh, Toast, List } from "vant";
export default {
  data() {
    return {
      wiringList: [],
      isLoading: false,
      pageindex: 1,
      loading: false,
      finished: false,
    };
  },
  methods: {
      getwiringDetail(id){
          this.$router.push(`/wiringDetail/${id}`);
          this.$router.push(`/wiringDetailLunbo/${id}`);
      },
    async getWiringList() {
      var res = await getWiringData(this.pageindex);
      this.wiringList = res.message;
    },
    onRefresh() {
      setTimeout(() => {
        this.pageindex = 1;
        this.wiringList = [];
        this.getWiringList();
        Toast("刷新成功");
        this.isLoading = false;
        // this.count++;
         this.onLoad();
      }, 1000);
    },
    // 上拉加载
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
       this.pageindex++;
       var res1 = await getWiringData(this.pageindex);
      setTimeout(() => {

        if(res1.message.length == 0){
            this.finished = true;
        }else{
            this.wiringList = this.wiringList.concat(res1.message);
        }
        // 加载状态结束
        this.loading = false;
      }, 1000);
    },
  },

  created() {
    this.getWiringList();
    this.$parent.title = "商品列表";
    this.$parent.bool = false;
    this.$parent.bool2 = true;
  },
  components: {
    "van-pull-refresh": PullRefresh,
    "van-list": List,
  },
};
</script>

<style lang="scss" scoped>
.wiring {
    background-color: #EBEBEB;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;

  .all {
      background-color: #fff;
    border: 1px solid #ccc;
    margin: 1.4px;
    border-radius: 10px;
    width: 47%;
    .Img {
      margin: auto;
      width: 170px;
      height: 170px;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .all2 {
      .text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        font-size: 12px;
        color: #333;
        // height: 35px;
        padding: 2px;
        margin: 2px;
      }
      .price {
        font-size: 16px;
        color: #ff0000;
        margin: 2px;
        font-weight: 800;
        del {
          font-size: 12px;
          color: #565252;
        }
      }
      .num {
        font-size: 14px;
        color: #565252;
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        .top {
          margin-left: 8px;
        }
        .num1 {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>