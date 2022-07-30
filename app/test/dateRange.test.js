const dateOperations = require('./dateRange');
test('start date 01/01/2022 and end date 01/12/2022 result 3 chart points', () => {
    expect(dateOperations.getDatesInRange('2022-01-01', '2022-01-12')).toStrictEqual([
        {"date": "10 Jan 2022", "pef": 20},{"date": "11 Jan 2022", "pef": 33},{"date": "12 Jan 2022", "pef": 83}]);
});