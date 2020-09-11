<template>
  <div class="login">
    
    <!-- 用户登录 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"username
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- 用户注册 -->
    <div class="text">
      <router-link to="/register">用户注册</router-link>
    </div>
  </div>
</template>

<script>
// vant插件
import { Field, Form, Button } from "vant";
// 引入接口
import { userLogin } from '@/api/index.js'
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(data) {
      console.log("submit", data);
        this.$toast.loading({
            message:'加载中...',
            // 阻止在登录时候多次点击
            forbidClick:true,
            // toast会一直存在
            duration:0
        });

        var {status,message,userInfo,token} = await userLogin(data);
        // console.log(status,message,userInfo,token);
        // 加载完毕，将toast清除
        this.$toast.clear();
        // 并显示状态
        this.$toast(message);
        

        
        if(status == 0){
            localStorage.setItem('token',token);
            localStorage.setItem('userInfo',JSON.stringify(userInfo));
            this.$router.push('/home');
        }


    },
  },
  created() {
    this.$parent.title = "登录注册";
    this.$parent.bool = false;
    this.$parent.bool2 = false;
  },
  components: {
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 20px;
  .text {
    text-align: center;

    a {
      color: rgb(185, 181, 181);
    }
  }
}
</style>