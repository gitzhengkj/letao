<template>
  <div class="address">
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @change-area="onChangeArea"
    />
  </div>
</template>

<script>
import { addUserAddressData } from '@/api/index.js'
import areaList from "@/util/area.js";
import { AddressEdit, Toast } from "vant";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    async onSave(addressInfo) {
      //   Toast("save");
      addressInfo.country = addressInfo.county;
      if (addressInfo.isDefaul == true) {
        addressInfo.isDefaul = 1;
      } else {
        addressInfo.isDefaul = 0;
      }
    //   将连接后的地址字符串赋值给原来的（提交时需要把地址编码链接在一起）
      addressInfo.areaCode = this.areaCode;
    //   console.log(addressInfo);
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var user_id = userInfo.id;

        var { status,message } = await addUserAddressData(user_id,addressInfo);
        this.$toast(message);
        if(status == 0 ){
            this.$router.push('/addressManager');
        }
    },

    // 地址编码链接在一起
    onChangeArea(values) {
      // 用户点击省市区确认按钮会触发
      console.log(values);
      var areaArr = [];
      values.map((v) => {
        areaArr.push(v.code);
      });
      this.areaCode = areaArr.join("-");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [];
      } else {
        this.searchResult = [];
      }
    },
  },
  created() {
    this.$parent.title = "添加地址";
    this.$parent.bool = false;
    this.$parent.bool2 = true;
  },
  components: {
    "van-address-edit": AddressEdit,
  },
};
</script>

<style lang="scss" scoped>
</style>