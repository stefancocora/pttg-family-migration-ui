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
        function checkApplication(nino, applicationReceivedDate, dependants) {
            var url = 'application?nino='+nino+'&applicationReceivedDate='+applicationReceivedDate + (dependants>0 ? '&dependants='+dependants : '');
            return $http.get(url)
                .then(
                    function success(response) { return response.data },
                    function error(response) { throw response }
                );

        }
    }
})();