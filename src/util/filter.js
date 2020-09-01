import Vue from "vue";

// 设置一个全局过滤器
import moment from "moment";
Vue.filter('dateFormat',function(date,format="YYYY-MM-DD"){
    return moment(date).format(format);
});