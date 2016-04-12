(function() {
    'use strict';

    angular
        .module('app.core')
        .controller('coreController', coreController);

    coreController.$inject = ['$rootScope','$location','restService','$anchorScroll'];
    /* @ngInject */
    function coreController($rootScope, $location, restService, $anchorScroll) {
        var vm = this;

        var NINO_REGEX = /^[a-zA-Z]{2}[0-9]{6}[a-dA-D]{1}$/;
        var CURRENCY_SYMBOL = '£';
        var DATE_DISPLAY_FORMAT = 'DD/MM/YYYY';
        var DATE_VALIDATE_FORMAT = 'YYYY-M-D';
        var INVALID_NINO_NUMBER = '0001';

        vm.model = {
            nino: '',
            fromDateDay: '',
            fromDateMonth: '',
            fromDateYear: '',
            meetsFinancialRequirements: false,
            failureReason: '',
            threshold: {
                amount: 0,
                isoCurrencyCode: 'GBP'
            },
            applicationReceivedDate: '',
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
            return accounting.formatMoney(vm.model.threshold.amount, { symbol: CURRENCY_SYMBOL, precision: 0});
        };

        vm.getFullDate = function() {
            return vm.model.fromDateYear+'-'+vm.model.fromDateMonth+'-'+vm.model.fromDateDay;
        };

        vm.formatDate = function() {
            return moment(vm.getFullDate(), DATE_VALIDATE_FORMAT, true).format("DD/MM/YYYY");
        }

        vm.scrollTo = function(anchor){
            $anchorScroll(anchor);
        };

        vm.submit = function() {

            if (validateForm()) {

                restService.checkApplication(vm.model.nino, vm.getFullDate())
                    .then(function(data) {
                        vm.model.meetsFinancialRequirements = data.application.financialRequirementsCheck.met;
                        if (angular.isDefined(data.application.financialRequirementsCheck.failureReason)) {
                            vm.model.failureReason = data.application.financialRequirementsCheck.failureReason;
                        } else {
                            vm.model.failureReason = '';
                        }
                        vm.model.threshold = data.application.threshold;
                        vm.model.applicant = data.application.applicant;
                        vm.model.applicationReceivedDate = moment(data.application.applicationReceivedDate).format(DATE_DISPLAY_FORMAT);
                        vm.model.checkedFrom = moment(data.application.financialRequirementsCheck.checkedFrom).format(DATE_DISPLAY_FORMAT);
                        vm.model.checkedTo = moment(data.application.financialRequirementsCheck.checkedTo).format(DATE_DISPLAY_FORMAT);
                        $location.path('/income-proving-result');
                    }).catch(function(error) {
                        if (error.status === 400 && error.data.error.code === INVALID_NINO_NUMBER){
                            vm.ninoInvalidError = true;
                            vm.restError = true;
                        } else if (error.status === 404) {
                            //vm.ninoNotFoundError = true;
                            //vm.restError = true;
                            $location.path('/income-proving-no-records');
                        } else {
                            // vm.serverError = error.statusText;
                            vm.serverError = error.status;
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
            } else {

                if (!NINO_REGEX.test(vm.model.nino)) {
                    vm.ninoInvalidError = true;
                    vm.queryForm.nino.$setValidity(false);
                    validated = false;
                }
            }

            if (vm.model.fromDateDay === null ||
                vm.model.fromDateMonth === null ||
                vm.model.fromDateYear === null  ) {
                vm.queryForm.fromDateDay.$setValidity(false);
                vm.queryForm.fromDateMonth.$setValidity(false);
                vm.queryForm.fromDateYear.$setValidity(false);
                vm.dateMissingError = true;
                validated = false;
            } else  if (!moment(vm.getFullDate(), DATE_VALIDATE_FORMAT, true).isValid()){
                vm.dateInvalidError = true;
                validated = false;
            }
            vm.model.nino = vm.model.nino.toUpperCase();
            return validated;
        }
    }

})();