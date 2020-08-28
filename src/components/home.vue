<template>
  <div class="home">

      <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" :indicator-color="color">
      <van-swipe-item v-for="item in lunboData" :key="item.img">
        <img :src="item.img" />
      </van-swipe-item>

    </van-swipe>
  
    <!-- 八宫格 -->
    <van-grid :column-num="4" :border="false">
      <van-grid-item icon="photo-o" text="文字">
        <img src="../assets/menu10.png" alt />
        <div>数码电器</div>
      </van-grid-item>

      <van-grid-item icon="photo-o" text="文字">
        <img src="../assets/menu12.png" alt />
        <div>乐淘头条</div>
      </van-grid-item>

      <van-grid-item icon="photo-o" text="文字">
        <img src="../assets/menu18.png" alt />
        <div>美图赏析</div>
      </van-grid-item>

      <van-grid-item icon="photo-o" text="文字">
        <img src="../assets/menu15.png" alt />
        <div>乐淘服饰</div>
      </van-grid-item>

      <van-grid-item icon="photo-o" text="文字">
        <img src="../assets/menu12.png" alt />
        <div>9.9元拼单</div>
      </van-grid-item>

      <van-grid-item icon="photo-o" text="文字">
        <img src="../assets/menu13.png" alt />
        <div>乐购超市</div>
      </van-grid-item>

      <van-grid-item icon="photo-o" text="文字">
        <img src="../assets/menu16.png" alt />
        <div>物流查询</div>
      </van-grid-item>

      <van-grid-item icon="photo-19" text="文字">
        <img src="../assets/menu17.png" alt />
        <div>全部</div>
      </van-grid-item>
    </van-grid>
    <!-- 分割线 -->
    <van-divider :style="{ color: 'rgb(74, 74, 74)' , fontSize: '16px', borderColor: 'rgb(167, 172, 178)', padding: '0 16px' }">为你推荐</van-divider>
    <div class="rec">
      <!--子推荐 -->
      <div class="recOne" v-for="item in recommendData" :key="item.id">
       
        <!-- <img :src="item.img_url"  alt=""> -->
        <img v-lazy="item.img_url">
        <div class="title">
          <!-- 金士顿（Kingston）DataTraveler SE9 32GB... -->
          {{ item.title }}
        </div>
        <div class="price">
          ￥ {{item.sell_price}} <span>{{item.buy}}人已购买</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Grid, GridItem, Divider   } from "vant";
// 轮播，推荐信息
import { getLunBoData ,getRecommendData} from "@/api/index.js";
// import axios from "axios";
export default {
    data(){
      return{
          color: "#ccc",
          // 轮播数据空数组
          lunboData:[],
          // 推荐数据空数组
          recommendData:[]
          
      }
    },
    components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem,
        "van-grid": Grid,
        "van-grid-item": GridItem,
        "van-divider": Divider,
       
    },
    methods:{
        //   获取lunbo数据
        async getLunbo() {
            var res = await getLunBoData();
            this.lunboData = res.message;
            
        },
        // 获取推荐信息数据
        async getRecommend(){
          var {message} = await getRecommendData();
          this.recommendData = message;
         
        },
        rec(){
          this.$router.push('/recommend');
        }
    },
    created() {
        this.getLunbo();
        this.getRecommend();
    }
};
</script>

<style lang="scss" scoped>
.home {
  // height: 1350px;
  background-color: rgb(238, 238, 238);
  margin-bottom: 50px;
  // 轮播图
  .my-swipe {
    height: 200px;
    .van-swipe-item {
      img {
        widows: 100%;
        height: 100%;
      }
    }
  }
  // 八宫格
  .van-grid {
    .van-grid-item {
      background-color: rgb(255, 255, 255);
      padding: 8px 2px;

      img {
        width: 50%;
      }

      text {
      
        color: #524949;
      }
    }
  }
  // 推荐
  .rec {
    display: flex;
    flex-flow:row wrap;
    justify-content: center;
    width: 100%;
    // height: 1200px;
    .recOne{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 4px;
      width: 172px;
      height: 244px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      img{
        // height: 100%;
        width: 172px;
        height: 172px;
      }
      .title {
        font-size: 12px;
        color: #333;
        text-align: center;
        
      }
      .price{
     
        font-size: 14px;
        color: #FF5500;
        margin: 0 auto;
        
        span{
          font-size: 12px;
          color: #999;

        }
      }
    }
  }
}


</style>