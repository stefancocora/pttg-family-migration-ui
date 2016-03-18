(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('restService', restService);

    restService.$inject = ['$http', '$q'];
    /* @ngInject */
    function restService($http, $q) {
        return {
            checkApplication : checkApplication
        };
        function checkApplication(nino, applicationReceivedDate) {
            return $http.get('http://localhost:8000/application?nino='+nino+'&applicationReceivedDate='+applicationReceivedDate)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(error) {
                throw error;
            }
        }
    }
})();