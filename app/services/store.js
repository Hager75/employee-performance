import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    chartData: [],
  },
  mutations: {
    setChartData(state, payload) {
      state.chartData = [...payload];
    },
  },
  getters: {
    chartData(state) {
      return state.chartData;
    },
    xAxisChartData(state) {
      return state.chartData.map((item) => this.formatDate(item.date_ms));
    },
    yAxisChartData(state) {
      return state.chartData.map((item) => +item.performance * 100);
    },
  },
  actions: {
    loadChartData(context) {
      axios.get('https://fe-task.getsandbox.com/performance').then((res)=>{
        let data = res.data;
        context.commit('setChartData', data);
      }).catch((error)=>{
        console.log(error);
      });
    },
  },
});
export default store;
