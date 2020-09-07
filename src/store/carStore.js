import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);
// 购物车对象{id，num,price,select}

// 判断本地存储有无商品，取出放在全局共享
var carDates = JSON.parse(localStorage.getItem('carData')) || [];
const Store = new Vuex.Store({
    state: {
        carDate: carDates
    },
    mutations: {
        addCar(state, goods) {
            // some(找到后停止匹配)
            // 加入之前判断之前是否有同名id的商品
            var index;
            var hasSomeGoods = state.carDate.some(function (item, i) {
                // console.log(i);
                index = i;
                return item.id === goods.id;
            })
            if (hasSomeGoods) {
                // 如果有，累加商品数量 
                state.carDate[index].number += goods.number;
            } else {
                //如果没有 构造购物车商品对象
                state.carDate.push(goods);
            }
            // 把购物车同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carDate));
        },
        // 删除购物车商品
        delCarGoods(state, goods_id) {
            var index=0;      
            var isFind = state.carDate.some((v, k) => {
                // console.log(v.id == goods_id);
                if (v.id == goods_id) {

                    index = k;
                    return true;
                }
            
            });
            
            // 通过下标删除数组元素
            if (isFind) {
                state.carDate.splice(index, 1);
            }
            // 把购物车同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carDate));
        },
        changeGoodsSelected(state, obj) {
            var index =  state.carDate.findIndex(v => {
                return v.id == obj.goods_id;
            })
            state.carDate[index].selected = obj.selected;
            // 把购物车同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carDate));
        },
        changeGoodsNumber(state, obj) {
            var index =  state.carDate.findIndex(v => {
                return v.id == obj.goods_id;
            })
            state.carDate[index].number = obj.number;
            // 把购物车同步到本地存储
            localStorage.setItem('carData', JSON.stringify(state.carDate));
        },
    },
    getters: {
        // 获取购物车商品的总数量
        carTotal(state) {
            // console.log(state.carDate);
            var total = 0;
            state.carDate.map(v => total += parseInt(v.number))
            return total;
        },
        //获取到购物车的商品id
        getGoodsIds(state) {
            var ids = [];
            state.carDate.map(v => ids.push(v.id));
            var idStr = ids.join(',');
            return idStr;
        },
        // 获取购物车商品的购买数量{key：id，值：number}
        getGoodsNumber(state) {
            var obj = {};
            state.carDate.map(v => {
                // obj[单独加id属性]不然会覆盖
                obj[v.id] = v.number;
            });
            return obj;
        },

        // 获取购物车商品的选中状态
        getGoodsSelected(state) {
            var obj = {};
            state.carDate.map(v => {
                // obj[单独加id属性]不然会覆盖
                obj[v.id] = v.selected;
            });
            return obj;
        },
        // 获取购物车商品选中的数量
        getGoodsSelectedNumber(state) {
            var total = 0;
            // console.log(state);
            state.carDate.map(v => {
                if (v.selected === true) {

                    total += v.number;
                }
                // console.log(total);
            });
            return total;
        },
        // 获取购物车选中的总价格
        getGoodsSelectedPrice(state) {
            var totalPrice = 0;
            // console.log(state);
            state.carDate.map(v => {
                if (v.selected === true) {

                    totalPrice += v.number * v.price;
                }
            });
            return totalPrice * 100;
        }

    }
})

export default Store