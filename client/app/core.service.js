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
            return $http.get('application?nino='+nino+'&applicationReceivedDate='+applicationReceivedDate)
                .then(
                    function success(response) { return response.data },
                    function error(response) { throw response }
                );

        }
    }
})();