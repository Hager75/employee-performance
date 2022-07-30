import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import 'ngVue/build/plugins.js';
import 'angular-sanitize/angular-sanitize.js';
import PerformancePageComponent from './pages/performance-page.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import SearchBarComponent from './components/vue-components/search-bar.vue';
angular.module('appModule', [
  'ui.router',
  'ngVue',
  'ngVue.plugins',
  'ngSanitize',
]);

angular.module('appModule').directive('vPerformancePage', (createVueComponent) => {
  return createVueComponent(Vue.component('performancePageComponent', PerformancePageComponent));
});
angular.module('appModule').directive('vPerformanceChart', (createVueComponent) => {
  return createVueComponent(Vue.component('performanceChartComponent', PerformanceChartComponent));
});
angular.module('appModule').directive('vSearchBar', (createVueComponent) => {
  return createVueComponent(Vue.component('searchBarComponent', SearchBarComponent));
});
