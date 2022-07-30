<template>
  <div class="c-chart__container">
    <v-chart ref="chart" :option="chartOptions" />
    <div v-if="performanceDateRangePoints.length > 0">
        <h3 class="result-header">result for filteration</h3>
      <div
        v-for="performanceDateRangePoint in performanceDateRangePoints"
        :key="performanceDateRangePoint.date"
      >
        <div class="result-wrapper">
          <div class="result__date">
            <h4>Date: </h4>
            {{ performanceDateRangePoint.date }}
          </div>
          <div class="result__date">
            <h4>Performance: </h4>
            {{ performanceDateRangePoint.performance }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import store from "../../services/store";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "PerformanceChartComponent",

  components: {
    VChart,
  },
  props: {
    startDate: String,
    endDate: String,
  },
  data() {
    return {
      dates: [],
      datesChartData: [],
      performanceChartData: [],
      performanceDateRangePoints: [],
    };
  },

  computed: {
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
                visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#FC7D02",
            },
            {
              gt: 50,
              lte: 80,
              color: "#FBDB0F",
            },
            {
              gt: 80,
              lte: 100,
              color: "#93CE07",
            },
          ],
          outOfRange: {
            color: "#999",
          },
        },
      };
    },

    xAxisData() {
      this.datesChartData = store.getters["chartData"].map((item) =>
        this.formatDate(item.date_ms)
      );
      return [...this.datesChartData];
    },

    yAxisData() {
      this.performanceChartData = store.getters["chartData"].map(
        (item) => +item.performance * 100
      );
      return store.getters["chartData"].map((item) => +item.performance * 100);
    },
    receivedChartData() {
      return store.getters["chartData"];
    },
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
    getDatesInRange(startDate, endDate) {
      this.dates = [];
      let formatStartDate = moment(startDate);
      let formatEndDate = moment(endDate);
      while (formatStartDate <= formatEndDate) {
        this.dates.push(moment(formatStartDate).format("DD MMM YYYY"));
        formatStartDate = moment(formatStartDate).add(1, "days");
      }
      this.getPointsPerformance();
      return this.dates;
    },
    getPointsPerformance() {
      this.performanceDateRangePoints = [];
      this.datesChartData.map((dateChart) => {
        this.dates.filter((dateRange) => {
          if (dateRange == dateChart) {
            let indexDate = this.datesChartData.indexOf(dateRange);
            this.performanceDateRangePoints = [
              ...this.performanceDateRangePoints,
              {
                performance: this.performanceChartData[indexDate],
                date: dateChart,
              },
            ];
          }
        });
      });
    },
  },
  mounted() {
    store.dispatch("loadChartData");
  },
  watch: {
    startDate() {
      if (this.endDate && this.startDate) {
        this.getDatesInRange(this.startDate, this.endDate);
      }
    },
    endDate() {
      if (this.endDate && this.startDate) {
        this.getDatesInRange(this.startDate, this.endDate);
      }
    },
  },
};
</script>
