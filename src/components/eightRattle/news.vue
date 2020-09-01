<template>
  <!--新闻页面 -->
  <!-- 下拉加载 -->
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <div class="newslist">
      <!-- 刷新组件 -->
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <!-- 子div -->
        <div class="item" v-for="item in newslist"  @click="getNewsDetail(item.id)" :key="item.id" >
          <div class="img_container">
            <img v-lazy="item.img_url" alt />
          </div>
          <div class="text">
            <div class="title">{{item.title}}</div>
            <div class="info">
              <span>发布时间:{{item.add_time | dateFormat("YYYY-MM-DD")}}</span>
              <span>点击次数：{{item.click}}</span>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <!-- 下拉加载 -->
  </van-list>
</template> 

<script>
// 新闻数据
import { getNewsListData } from "@/api/index.js";
// 引入vant下拉刷新插件
import { PullRefresh, Toast, List } from "vant";
export default {
  name: "newslist",
  data() {
    return {
      newslist: [],
      page: 1,
      pagesize: 10,
      isLoading: false,

      // 下拉刷新
      loading: false,
      finished: false,
    };
  },
  methods: {
    // 到新闻详情页面路由
     getNewsDetail(id){
       this.$router.push(`/newsDetail/${id}`);
     },

    // 获取头条数据
    async getNewsList() {
      var res = await getNewsListData(this.page, this.pagesize);
      this.newslist = res.message;
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.page = 1;
        this.newslist = [];
        (this.pagesize = 10), this.getNewsList();
        Toast("刷新成功");
        this.isLoading = false;
        // this.page++;
        // 下拉刷新后，加载后面数据
        this.onLoad();
      }, 1000);
    },
    // 上拉加载
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.page++;
      var res1 = await getNewsListData(this.page, this.pagesize);
      setTimeout(() => {
        if (res1.message.length == 0) {
          this.finished = true;
        } else {
          this.newslist = this.newslist.concat(res1.message);
        }
        // 加载状态结束
        this.loading = false;
      }, 1000);
    },
  },
  created() {
    // 更改通栏结构
    this.getNewsList();
    this.$parent.title = "新闻列表";
    this.$parent.bool = false;
  },
  components: {
    // 刷新
    "van-pull-refresh": PullRefresh,
    "van-list": List,
  },
};
</script>

<style lang="scss" scoped>
.newslist {
  // margin-bottom: 50px;
  padding: 4px;
  background-color: rgb(241, 235, 235);
  .item {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ccc;
    margin-top: 8px;

    .img_container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1px;
      width: 100px;
      height: 100px;

      img {
        width: 100px;
        height: 100px;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2px;
      .title {
        width: 200px;
        color: #000;
        font-size: 14px;
        margin-top: 10px;
        font-weight: 700;

        overflow: hidden;
        // 数字英文换行
        word-wrap: break-word;
        // 限制两行文本，超出显示省略号
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .info {
        display: flex;
        justify-content: space-between;
        color: #888;
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>