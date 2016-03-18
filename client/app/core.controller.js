(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('coreController', coreController);

    coreController.$inject = ['$rootScope','$location','restService'];
    /* @ngInject */
    function coreController($rootScope, $location, restService) {
        var vm = this;

        vm.model = {
            nino: '',
            fromDateDay: 1,
            fromDateMonth: 1,
            fromDateYear: 2016,
            meetsFinancialRequirements: false,
            threshold: {
                amount: 0,
                isoCurrencyCode: "GBP"
            },
            applicationDate: '2016-01-01',
            applicant : {
                title: '',
                forename: '',
                surname: ''
            }
        };
        vm.dateError = false;
        vm.ninoMissingError = false;
        vm.ninoInvalidError = false;
        vm.ninoNotFoundError = false;
        vm.serverError = '';

        vm.formatAmount = function() {
            return accounting.formatMoney(vm.model.threshold.amount, { symbol: '£', precision: 0});
        };

        vm.getFullDate = function() {
            return vm.model.fromDateDay+'/'+vm.model.fromDateMonth+'/'+fromDateYear;
        };

        vm.submit = function() {

            if (validateForm()) {

                restService.checkApplication(vm.model.nino, vm.getFullDate)
                    .then(function(data) {
                        vm.model.meetsFinancialRequirements = data.application.meetsFinancialRequirements;
                        vm.model.threshold = data.application.threshold;
                        vm.model.applicant = data.application.applicant;
                        vm.model.applicationDate = moment(data.application.applicationDate).format('DD/MM/YYYY');
                        $location.path('/income-proving-result');
                    }).catch(function(error) {
                        if (error.status === 400 && error.data.error.code === "0001"){
                            vm.ninoInvalidError = true;
                            vm.restError = true;
                        } else if (error.status === 404) {
                            vm.ninoNotFoundError = true;
                            vm.restError = true;
                        } else {
                            vm.serverError = e.statusText;
                        }
                   });
             } else {
                vm.queryForm.$setValidity(false);
             }
        };

        vm.newSearch = function() {
            $location.path('/income-proving-query');
        };

        function clearErrors() {
            vm.ninoNotFoundError = false;
            vm.ninoInvalidError = false;
            vm.restError = false;
            vm.ninoMissingError = false;
            vm.dateError = false;
            vm.serverError = '';
        }

        function validateForm(){
            var validated = true;
            clearErrors();
            if (vm.model.nino === '') {
                vm.queryForm.nino.$setValidity(false);
                vm.ninoMissingError = true;
                validated =  false;
            }

            if (vm.model.fromDateDay === null ||
                vm.model.fromDateMonth === null ||
                vm.model.fromDateYear === null  ) {
                vm.queryForm.fromDateDay.$setValidity(false);
                vm.queryForm.fromDateMonth.$setValidity(false);
                vm.queryForm.fromDateYear.$setValidity(false);
                vm.dateError = true;
                validated = false;
            }

            return validated;
        }

    }

})();