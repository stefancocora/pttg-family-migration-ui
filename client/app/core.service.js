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
            var url = 'individual/'+nino+'/financialstatus?applicationRaisedDate='+applicationRaisedDate + (dependants>0 ? '&dependants='+dependants : '');
            return $http.get(url)
                .then(
                    function success(response) { return response.data },
                    function error(response) { throw response }
                );

        }
    }
})();