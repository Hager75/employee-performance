angular.module('appModule').service('Employees', EmployeesService);

let currentPage = 1;
function EmployeesService($http) {
  const getEmployees = () => {
    const employeesUrl = 'https://fe-task.getsandbox.com/employees';

    return $http.get(employeesUrl);
  };

  const loadMoreEmployees = () => {
    // [Load more empolyess logic goes here]
    currentPage++;
    const employeesUrl = `https://fe-task.getsandbox.com/employees?page=${currentPage}`;
    console.log($http.get(employeesUrl));
    return $http.get(employeesUrl);
  };

  return {
    getEmployees,
    loadMoreEmployees,
  };
}
