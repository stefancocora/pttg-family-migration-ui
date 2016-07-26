(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('coreController', coreController);

    coreController.$inject = ['$rootScope', '$location', 'restService', '$anchorScroll', '$log'];
    /* @ngInject */
    function coreController($rootScope, $location, restService, $anchorScroll, $log) {
        var vm = this;

        var NINO_REGEX = /^[a-zA-Z]{2}[0-9]{6}[a-dA-D]{1}$/;
        var CURRENCY_SYMBOL = '£';
        var DATE_DISPLAY_FORMAT = 'DD/MM/YYYY';
        var DATE_VALIDATE_FORMAT = 'YYYY-M-D';
        var INVALID_NINO_NUMBER = '0001';

        initialise();

        vm.formatAmount = function () {
            return accounting.formatMoney(vm.model.threshold.amount, {symbol: CURRENCY_SYMBOL, precision: 0});
        };

        vm.getFullDate = function() {
            var month = vm.model.fromDateMonth > 9 ? vm.model.fromDateMonth : '0' + vm.model.fromDateMonth;
            var day = vm.model.fromDateDay > 9 ? vm.model.fromDateDay : '0' + vm.model.fromDateDay
            return vm.model.fromDateYear+'-'+month+'-'+day;
            return vm.model.fromDateYear+'-'+vm.model.fromDateMonth+'-'+vm.model.fromDateDay;
        };

        vm.formatDate = function () {
            return moment(vm.getFullDate(), DATE_VALIDATE_FORMAT, true).format("DD/MM/YYYY");
        }

        vm.scrollTo = function (anchor) {
            $anchorScroll(anchor);
        };

        vm.submit = function () {

            if (validateForm()) {

                restService.checkApplication(vm.model.nino, vm.getFullDate(), vm.model.dependants)
                    .then(function (data) {
                        vm.model.meetsFinancialRequirements = data.categoryCheck.passed;
                        if (angular.isDefined(data.categoryCheck.failureReason)) {
                            vm.model.failureReason = data.categoryCheck.failureReason;
                        } else {
                            vm.model.failureReason = '';
                        }
                        vm.model.individual = data.individual;
                        vm.model.applicationRaisedDate = moment(data.categoryCheck.applicationRaisedDate).format(DATE_DISPLAY_FORMAT);
                        vm.model.checkedTo = moment(data.categoryCheck.applicationRaisedDate).format(DATE_DISPLAY_FORMAT);
                        vm.model.checkedFrom = moment(data.categoryCheck.assessmentStartDate).format(DATE_DISPLAY_FORMAT);
                        $location.path('/income-proving-result');
                    }).catch(function(error) {
                    $log.debug("received a non success result: " + error.status + " : " + error.statusText)
                    if (error.status === 404) {
                        $location.path('/income-proving-no-records');
                    } else {
                        vm.serverError = 'Unable to process your request, please try again.';
                        vm.serverErrorDetail = error.data.message;
                    }
                });
            } else {
                vm.validateError = true;
            }
        };

        vm.newSearch = function () {
            initialise()
            $location.path('/income-proving-query');
        };

        function initialise() {

            vm.model = {
                nino: '',
                fromDateDay: '',
                fromDateMonth: '',
                fromDateYear: '',
                dependants: '',
                meetsFinancialRequirements: false,
                failureReason: '',
                applicationRaisedDate: '',
                individual: {
                    title: '',
                    forename: '',
                    surname: ''
                }
            };

            vm.validateError = false;
            vm.dateInvalidError = false;
            vm.dateMissingError = false;

            vm.dependantsInvalidError = false;

            vm.ninoMissingError = false;
            vm.ninoInvalidError = false;
            vm.ninoNotFoundError = false;

            vm.serverError = '';
            vm.serverErrorDetail = '';
        }

        function clearErrors() {
            vm.ninoNotFoundError = false;
            vm.ninoInvalidError = false;
            vm.restError = false;
            vm.ninoMissingError = false;
            vm.dateMissingError = false;
            vm.dateInvalidError = false;
            vm.dependantsInvalidError = false;

            vm.serverError = '';
            vm.serverErrorDetail = '';
            vm.validateError = false;
        }

        function validateForm() {
            var validated = true;
            clearErrors();

            vm.model.nino = vm.model.nino.replace(/ /g, '');

            if (vm.model.nino === '') {
                vm.queryForm.nino.$setValidity(false);
                vm.ninoMissingError = true;
                validated = false;
            } else {

                if (!NINO_REGEX.test(vm.model.nino)) {
                    vm.ninoInvalidError = true;
                    vm.queryForm.nino.$setValidity(false);
                    validated = false;
                }
            }

            if (vm.model.fromDateDay === null ||
                vm.model.fromDateMonth === null ||
                vm.model.fromDateYear === null) {
                vm.queryForm.applicationRaisedDateDay.$setValidity(false);
                vm.queryForm.applicationRaisedDateMonth.$setValidity(false);
                vm.queryForm.applicationRaisedDateYear.$setValidity(false);
                vm.dateMissingError = true;
                validated = false;
            } else if (!moment(vm.getFullDate(), DATE_VALIDATE_FORMAT, true).isValid()) {
                vm.dateInvalidError = true;
                validated = false;
            } else if (moment(vm.getFullDate(), DATE_VALIDATE_FORMAT, true).isAfter(moment(), 'day')) {
                vm.dateInvalidError = true;
                validated = false;
            }

            if (vm.model.dependants !== null && !(/^\d{0,2}$/.test(vm.model.dependants))) {
                vm.dependantsInvalidError = true;
                validated = false;
            }

            vm.model.nino = vm.model.nino.toUpperCase();
            return validated;
        }
    }

})();