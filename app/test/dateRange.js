const moment = require('moment');

let dates = [];
let datesChartData = [
    '10 Jan 2022', '11 Jan 2022', '12 Jan 2022', '13 Jan 2022', '14 Jan 2022', '15 Jan 2022', '16 Jan 2022'
];
let performanceChartData = [
    20, 33, 83, 31, 65, 88, 90
];

const dateOperations = {
 getDatesInRange(startDate, endDate) {
    dates = [];
    let formatStartDate = moment(startDate);
    let formatEndDate = moment(endDate);
    while (formatStartDate <= formatEndDate) {
      dates.push(moment(formatStartDate).format("DD MMM YYYY"));
      formatStartDate = moment(formatStartDate).add(1, 'days');
    }
    return getPointsPerformance();
  }
};  
function getPointsPerformance() {
    newArr = [];
    datesChartData.map((dateChart) => {
      dates.filter((dateRange) => {
        if (dateRange == dateChart) {
          let indexDate = datesChartData.indexOf(dateRange);
          newArr = [
            ...newArr,
            {
              pef: performanceChartData[indexDate],
              date: dateChart,
            },
          ];
        }
      });
    });
    return newArr;
  };

  module.exports = dateOperations