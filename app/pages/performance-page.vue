<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <date-range-component
        @onChangeStartDate="onChangeStartDate"
        @onChangeEndDate="onChangeEndDate"
      ></date-range-component>
    </div>

    <div class="c-dashboard__header">
      <performance-chart-component :startDate="startDate" :endDate="endDate"/>
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
import DateRangeComponent from "../components/vue-components/date-range.vue";

export default {
  name: "AboutPageComponent",
  components: {
    PerformanceChartComponent,
    DateRangeComponent,
  },
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    onChangeStartDate(value) {
      this.startDate = value;
    },
    onChangeEndDate(value) {
      this.endDate = value;
    },
  },
};
</script>
