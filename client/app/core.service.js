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
        function checkApplication(nino, applicationRaisedDate, dependants) {
            var url = 'incomeproving/v1/individual/'+nino+'/financialstatus';
            return $http.get(url, {
                params: { applicationRaisedDate: applicationRaisedDate, dependants: dependants }
            })

                .then(
                    function success(response) { return response.data },
                    function error(response) { throw response }
                );

        }
    }
})();