angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.searchValue = '';
  homePageVm.handleSearchEvent = function (value) { homePageVm.searchValue = value; };

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }
}
window.addEventListener('load', () => {
  window.history.pushState({}, '', '');
});
