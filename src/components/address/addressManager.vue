<template>
  <div class="manager">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
     
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { AddressList ,Toast} from "vant";
import { userAddressData } from '@/api/index.js';
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
    
  },
   methods: {
    // 加载数据
    async loadAddress(){
        var userInfo = JSON.parse( localStorage.getItem('userInfo'));
        var userAddress = await userAddressData(userInfo.id);
        console.log(userAddress);
        var  _temp = this;

        userAddress.map(v=>{
            // 本地存储的属性和要的数据属性不一致，要转一下
            v.address = v.addressDetail;
            // 默认
            
            if(v.isDefault == 1){
                v.isDefault = true;
                _temp.chosenAddressId = v.id;
            }else{
                delete v.isDefault;
            }
        });
        // 把从本地存储的数据放给list回显
        this.list = userAddress;
        console.log(this.list);
    
    },

    onAdd() {
    //   Toast('新增地址');  
        this.$router.push('/addressadd');  
    },
    onEdit(item, index) {
    //   Toast('编辑地址:' + index);
        var addressStr = JSON.stringify(item); 
        this.$router.push(`/addressEdit/${addressStr}`);
    },
  },  
  created() {
    this.loadAddress();
    this.$parent.title = "地址管理";
    this.$parent.bool = false;
    this.$parent.bool2 = false;
  },
  components:{
      "van-address-list" : AddressList 
  }
};
</script>

<style lang="scss" scoped>
</style>