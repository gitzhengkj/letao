<template>
  <div class="newDetail">
    <h3 id="title">{{newsDetail.title}}</h3>
    <div class="time">
      <span>发布时间:{{newsDetail.add_time | dateFormat()}}</span>
      <span>阅读 {{newsDetail.click}}次</span>
    </div>
    <!-- 分割线 -->
    <van-divider :style="{borderColor: '#ccc', padding: '0 16px' }" />
    <div class="text" v-html="newsDetail.content"></div>
    <van-field
      class="textarea"
      rows="2"
      v-model="content"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="猛猛留言"
      show-word-limit
    />
    <!-- 评论按钮 -->
    <van-button type="info" class="ping" block @click="postComment">评论</van-button>

    <!-- 评论列表 -->
    <div class="list">
      <div class="item" v-for="item in comments" :key="item.id">
        <div class="user">
          <div>{{ item.user_name }}:{{ item.content }}</div>
          <div>评论时间：{{ item.add_time | dateFormat}}</div>
        </div>
      </div>

      <!-- 加载更多评论 -->
      <van-button
        type="danger"
        :loading="isLoading"
        loading-text="加载中..."
        block
        :plain="true"
        @click="loadMore"
      >查看更多</van-button>
    </div>
  </div>
</template>

<script>
// 引入插件
import { Divider, Field, Button } from "vant";
// 引入新闻详情数据
import {
  getNewsListDetailData,
  getNewsComment,
  postCommentData,
} from "@/api/index.js";
export default {
  props: ["id"],
  data() {
    return {
      newsDetail: {},
      page: 1,
      comments: [],
      isLoading: false,
      content: "",
    };
  },
  components: {
    "van-divider": Divider,
    "van-field": Field,
    "van-button": Button,
  },
  methods: {
    async getNewsDetailList() {
      var { message } = await getNewsListDetailData(this.id);
      this.newsDetail = message[0];
    },
    async getNewsCommentList() {
      this.isLoading = true;
      var { message } = await getNewsComment(this.id, this.page);
      // console.log(message);
      this.isLoading = false;
      this.comments = this.comments.concat(message);
    },

    async postComment() {
      var content = this.content.trim();
      if (content == "") {
        this.$toast("不能为空");
        return;
      }
      var { status, message, insertId } = await postCommentData(this.id);
      if (status == 0) {
        this.$toast(message);
        this.content = "";
        var item = {
          add_time: Date.now(),
          content,
          id: insertId,
          user_name: "访客",
        };
        this.comments.unshift(item);
      } else {
        this.$toast(message);
      }
    },
    loadMore() {
      // 加载更多
      this.page++;
      this.getNewsCommentList();
    },
  },

  created() {
    this.getNewsDetailList();
    this.getNewsCommentList();
    
  },
};
</script>

<style lang="scss" scope>
.newDetail {
  background-color: #faf9f9;
  padding: 5px 5px 50px 5px;
  #title {
    font-size: 16px;
    color: #404040;
    padding: 10px 10px;
    text-align: left;
  }
  .time {
    font-size: 12px;
    color: #888;
    display: flex;
    justify-content: space-between;
    padding: 0px 15px;
  }
  .comment {
    img {
      width: 100%;
    }
  }
  .text {
    img {
      width: 100%;
    }
  }

  // 评论列表
  .list {
    .item {
      background-color: #e8e8e8;
      display: block;
      margin: 10px;
    }
    .user {
      div {
        font-size: 12px;
        color: #000;
      }
    }
  }
}
</style>