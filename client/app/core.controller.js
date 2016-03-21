(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('coreController', coreController);

    coreController.$inject = ['$rootScope','$location','restService','$anchorScroll'];
    /* @ngInject */
    function coreController($rootScope, $location, restService, $anchorScroll) {
        var vm = this;

        vm.model = {
            nino: '',
            fromDateDay: 1,
            fromDateMonth: 1,
            fromDateYear: 2016,
            meetsFinancialRequirements: false,
            threshold: {
                amount: 0,
                isoCurrencyCode: 'GBP'
            },
            applicationReceivedDate: '2016-01-01',
            applicant : {
                title: '',
                forename: '',
                surname: ''
            }
        };

        vm.dateInvalidError = false;
        vm.dateMissingError = false;
        vm.ninoMissingError = false;
        vm.ninoInvalidError = false;
        vm.ninoNotFoundError = false;
        vm.serverError = '';

        vm.formatAmount = function() {
            return accounting.formatMoney(vm.model.threshold.amount, { symbol: '£', precision: 0});
        };

        vm.getFullDate = function() {
            return vm.model.fromDateYear+'-'+vm.model.fromDateMonth+'-'+vm.model.fromDateDay;
        };

        vm.scrollTo = function(anchor){
            $anchorScroll(anchor);
        };

        vm.submit = function() {

            if (validateForm()) {

                restService.checkApplication(vm.model.nino, vm.getFullDate())
                    .then(function(data) {
                        vm.model.meetsFinancialRequirements = data.application.financialRequirementsCheck.met;
                        vm.model.threshold = data.application.threshold;
                        vm.model.applicant = data.application.applicant;
                        vm.model.applicationReceivedDate = moment(data.application.applicationReceivedDate).format('DD/MM/YYYY');
                        vm.model.checkedFrom = moment(data.application.financialRequirementsCheck.checkedFrom).format('DD/MM/YYYY');
                        vm.model.checkedTo = moment(data.application.financialRequirementsCheck.checkedTo).format('DD/MM/YYYY');
                        $location.path('/income-proving-result');
                    }).catch(function(error) {
                        if (error.status === 400 && error.data.error.code === '0001'){
                            vm.ninoInvalidError = true;
                            vm.restError = true;
                        } else if (error.status === 404) {
                            vm.ninoNotFoundError = true;
                            vm.restError = true;
                        } else {
                            vm.serverError = error.statusText;
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
            vm.dateMissingError = false;
            vm.dateInvalidError = false;
            vm.serverError = '';
        }

        function validateForm(){
            var validated = true;
            clearErrors();

            vm.model.nino =  vm.model.nino.replace(/ /g,'');

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
                vm.dateMissingError = true;
                validated = false;
            } else  if (!moment(vm.getFullDate(), "YYYY-M-D", true).isValid()){
                vm.dateInvalidError = true;
                validated = false;
            }

            return validated;
        }
    }

})();