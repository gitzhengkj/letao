<template>
  <div class="photoContainer">
    <van-tree-select
      @click-nav="navHandle"
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
    >
      <template #content>
        <!-- 子组件 -->
        <news v-if="isShowNews" @click-img="bigphoto" :photochildren="items[activeIndex].children"></news>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
// 引入vant插件
import { TreeSelect, ImagePreview } from "vant";
import news from "@/components/common/news.vue";
import {
  getPhotoCateData,
  getPhotoCateChildrenData,
  getPhotoCateChildrenLunboData,
} from "@/api/index.js";
export default {
  name: "photo-component",
  data() {
    return {
      // 分类选择插件
      items: [
        //   {text:'分组1',children:[{text:11},{text:111},{text:111}]},
        //   {text:'分组2',children:[{text:2},{text:22},{text:333}]},
        //   {text:'分组3',children:[{text:3},{text:33},{text:333}]},
        //   {text:'分组4',children:[{text:4},{text:44},{text:444}]}
      ],

      activeId: 1,
      activeIndex: 0,
      isShowNews: false,
    };
  },
  components: {
    "van-tree-select": TreeSelect,
    [ImagePreview.Component.name]: ImagePreview.Component,
    news,
  },
  methods: {
    //默认获取第一个分组
    async getPhotoCate() {
      var { message } = await getPhotoCateData();
      // 防止message为0时抛错
      if (!message.length) {
        return;
      }
      var first_id = message[0].id;
      // console.log(firstChildren);
      var firstChildren = await this.getPhotoCateChildren(first_id);
      message[0].children = firstChildren;
      message.map((v) => {
        //这里vant里的属性是text，接口是title，要交互下
        v.text = v.title;
      });
      this.items = message;
      this.isShowNews = true;
      this.isShowNews = true;
    },

    // 获取每个分组的子分支
    async getPhotoCateChildren(id) {
      var { message } = await getPhotoCateChildrenData(id);
      message.map((v) => {
        v.text = v.title;
      });
      return message;
    },

    // 根据分组id获取相应的子分支

    async navHandle(index) {
      // 判断该分组是否已加载
      if (this.items[index].children) {
        return;
      }
      this.isShowNews = false;
      var id = this.items[index].id;
      var children = await this.getPhotoCateChildren(id);
      this.items[index].children = children;

      this.isShowNews = true;
    },

    async bigphoto(id) {
      var { message } = await getPhotoCateChildrenLunboData(id);
      if (!message.length) {
        this.$toast("暂时还没有图片");
        return;
      }
      var tempArr = [];
      message.map((v) => {
        tempArr.push(v.src);
      });
      ImagePreview(tempArr);
    },
  },
  created() {
    this.$parent.title = "美图赏析";
    this.$parent.bool = false;
    this.getPhotoCate();
  },
  activated: function () {
    this.$parent.title = "美图赏析";
    this.$parent.bool = false;
    this.getPhotoCate();
  },
};
</script>

<style lang="scss" scoped>
.photoContainer {
  .van-tree-select {
    height: 100vh !important;
  }
}
</style>