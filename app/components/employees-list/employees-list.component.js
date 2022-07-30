var that = null;
angular
  .module('appModule')
  .component('employeesList', {
    templateUrl: 'components/employees-list/employees-list.html',
    controller: EmployeesListComponent,
    controllerAs: 'EmployeesListComponentVm',
    bindings: {
      employeesList: '<',
      value: '<',
    },
  }).filter('checkmark', function ($sce) {
    return (input) => {
      if (that.value) {
        let resInclude = input.includes(that.value);
        if (resInclude && that.value !== '') {
          let re = new RegExp(that.value, 'g');
          input = input.replace(re, `<mark>${that.value}</mark>`);
          return $sce.trustAsHtml(input);
        }
      }
      return input;
    };
  });

function EmployeesListComponent() {
  that = this;
}
