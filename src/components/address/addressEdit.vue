<template>
  <div class="edit">
    <van-address-edit
      :area-list="areaList"
      :address-info="editAddressInfo"
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
      @change-default="onChangeDefault"
    />
  </div>
</template>

<script>
import { deleteUserAddressData, editUserAddressData } from "@/api/index.js";
import areaList from "@/util/area.js";
import { AddressEdit, Toast } from "vant";
export default {
  data() {
    return {
      areaList,
      areaCode: "",
      searchResult: [],
      editAddressInfo: JSON.parse(this.$route.params.addressInfo),
      isDefault: "",
      proCityCountry: [],
    };
  },
  methods: {
    async onSave(addressInfo) {
      console.log(addressInfo);
      addressInfo.areaCode = this.areaCode;
      addressInfo.isDefault = this.isDefault;

      var { status, message } = await editUserAddressData(
        addressInfo.id,
        addressInfo
      );

      // console.log(message);
      this.$toast(message);
      if (status == 0) {
        // this.$router.push("/addressManager");
        // 成功后直接退到上一级
        this.$router.go(-1);
      }
    },
    async onDelete() {
      //   Toast("delete");
      var address_id = this.editAddressInfo.id;
      var { status, message } = await deleteUserAddressData(address_id);
      this.$toast(message);
      if (status == 0) {
        this.$router.push("/addressManager");
      }
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          // {
          //   name: "黄龙万科中心",
          //   address: "杭州市西湖区",
          // },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onChangeArea(values) {
      // 用户点击省市区确认按钮会触发
      // console.log(values);
      var _this = this;
      var areaArr = [];
      _this.proCityCountry = [];
      values.map((v) => {
        areaArr.push(v.code);
        _this.proCityCountry.push(v.name);
      });
      this.areaCode = areaArr.join("-");
    },
    onChangeDefault(value) {
      console.log(value);
      this.isDefault = value ? "1" : "0";
    },
  },
  created() {
    var tempaddressCode = this.editAddressInfo.areaCode;
    console.log(tempaddressCode);
    this.editAddressInfo.areaCode = this.editAddressInfo.areaCode.split("-")[2]; // 回显

    this.areaCode = tempaddressCode; // 记录原来的地址编号
    this.isDefault = this.editAddressInfo.isDefault === true ? "1" : "0";

    this.$parent.title = "编辑地址";
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