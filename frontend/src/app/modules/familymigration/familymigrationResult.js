/* jshint node: true */

'use strict';

var familymigrationModule = angular.module('hod.familymigration');


// #### ROUTES #### //
familymigrationModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // define a route for the results operation
  $stateProvider.state({
    name: 'familymigrationResults',
    url: '/result',
    title: 'Financial Status : Result',
    parent: 'familymigration',
    views: {
      'content@': {
        templateUrl: 'modules/familymigration/familymigrationResult.html',
        controller: 'FamilymigrationResultCtrl'
      },
    },
  });
}]);


familymigrationModule.controller('FamilymigrationResultCtrl', ['$scope', '$state', '$filter', 'FamilymigrationService', function ($scope, $state, $filter, FamilymigrationService) {

  var res = FamilymigrationService.getLastAPIresponse();
  $scope.familyDetails = FamilymigrationService.getFamilyDetails();

  var displayDate = function (d) {
    return moment(d).format('DD/MM/YYYY');
  };

  if (!res.status) {
    $state.go('familymigration');
    return;
  }

  $scope.familyDetails.displayDate = displayDate($scope.familyDetails.date);
  $scope.individual = res.data.individual;

  $scope.haveResult = (res.data && res.data.categoryCheck) ? true: false;
  if ($scope.haveResult) {
    if (res.data.categoryCheck.passed) {
      $scope.success = true;
      $scope.heading = 'Yes, ' + res.data.individual.forename + ' ' + res.data.individual.surname + ' meets the requirement';
      $scope.reason = 'calculated on income information between ' + displayDate(res.data.categoryCheck.assessmentStartDate) + ' and ' + displayDate(res.data.categoryCheck.applicationRaisedDate);
    } else {
      $scope.success = false;
      $scope.heading = res.data.individual.forename + ' ' + res.data.individual.surname + ' doesn\'t meet the Category A requirement';
      $scope.reason = 'they haven\'t met the required monthly amount.';
    }
  } else {
    if (res.status === 404) {
      $scope.heading = 'There is no record for ' + $scope.familyDetails.nino + ' with HMRC';
      $scope.reason = 'We couldn\'t perform the financial requirement check as no income information exists with HMRC for the National Insurance Number ' + $scope.familyDetails.nino + '.';
    } else {

    }
  };
  console.log(res);
}]);