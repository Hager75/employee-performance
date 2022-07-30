angular
  .module('appModule')
  .controller('homeController', homePageController);

function homePageController(Employees) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.searchValue = '';
  homePageVm.hideButton = false;
  homePageVm.loading = false;
  homePageVm.handleSearchEvent = function (value) { homePageVm.searchValue = value; };

  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }
  homePageVm.loadMore = function () {
    homePageVm.loading = true;
    Employees.loadMoreEmployees()
      .then(({ data }) => {
        if (!data.error) {
          homePageVm.employees = homePageVm.employees.concat(data.employees);
        } else {
          homePageVm.hideButton = true;
        }
        homePageVm.loading = false;
      }).catch((error)=>{
        console.log(error);
      });
  };
}
window.addEventListener('load', () => {
  window.history.pushState({}, '', '');
});
