describe('coreController', function(){

   var location, coreController, scope, restService, form, q, response, deferred;

    beforeEach(module("app.core"));

    beforeEach(module('templates'));

    beforeEach(inject(function($q){
        q = $q;
        restService = {
            checkApplication : function(nino, applicationRaisedDate, dependants) {
            }
        };

     }));

    var spyOnNinoFailure = function(){
        spyOn(restService, 'checkApplication').and.callFake(function() {
            deferred = q.defer();
            var error = {status:400, data:{error:{code: "0001"}}};
            deferred.reject(error);
            return deferred.promise;
        });
    }

    var spyOnSuccessful = function(){
        spyOn(restService, 'checkApplication').and.callFake(function() {
            deferred = q.defer();
            deferred.resolve(response);
            return deferred.promise;
        });
    }


    beforeEach(inject(function($rootScope, $controller, $location, $templateCache, $compile,  $anchorScroll) {
        scope=$rootScope.$new();
        location = $location;

        coreController = $controller('coreController as vm', { '$scope' : scope, '$location' : location, 'restService' : restService, '$anchorScroll' : $anchorScroll } );

        var templateHtml = $templateCache.get('client/views/income-proving-query.html')

        var formElem = angular.element("<div>" + templateHtml + "</div>");
        $compile(formElem)(scope);
        form = scope.form;

        scope.$digest();

    }));

    it('is expected to be defined', function(){
        expect(coreController).toBeDefined();
    });

    it('is expected to format the date in ISO format', function(){
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        expect(coreController.getFullDate()).toEqual('2015-2-1')
    });

    it('is expected to format the date to DD/MM/YYYY', function(){
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        expect(coreController.formatDate()).toEqual('01/02/2015')
    });

    it('is expected to catch a missing NINO', function() {
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        coreController.model.nino='';

        coreController.submit();
        expect(coreController.ninoMissingError).toBeTruthy();
        expect(coreController.validateError).toBeTruthy();
    });


    it('is expected to catch an invalid NINO', function(){
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        coreController.model.nino='AA1234A';

        coreController.submit();
        expect(coreController.ninoInvalidError).toBeTruthy();
        expect(coreController.validateError).toBeTruthy();
    });

    it('is expected to catch a missing application raised date', function(){
        coreController.model.fromDateDay=null;
        coreController.model.fromDateMonth=null;
        coreController.model.fromDateYear=null;
        coreController.model.nino='AA123456A';

        coreController.submit();
        expect(coreController.dateMissingError).toBeTruthy();
        expect(coreController.validateError).toBeTruthy();
    });

    it('is expected to catch an invalid application raised date', function(){
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='22';
        coreController.model.fromDateYear='2015';
        coreController.model.nino='AA123456A';

        coreController.submit();
        expect(coreController.dateInvalidError).toBeTruthy();
        expect(coreController.validateError).toBeTruthy();
    });

    it('is expected to catch an invalid number of dependants', function(){
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='22';
        coreController.model.fromDateYear='2015';
        coreController.model.nino='AA123456A';
        coreController.model.dependants=-1

        coreController.submit();
        expect(coreController.dependantsInvalidError).toBeTruthy();
        expect(coreController.validateError).toBeTruthy();
    });

    it('is expected to catch invalid characters in dependants', function(){
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='22';
        coreController.model.fromDateYear='2015';
        coreController.model.nino='AA123456A';
        coreController.model.dependants='f'

        coreController.submit();
        expect(coreController.dependantsInvalidError).toBeTruthy();
        expect(coreController.validateError).toBeTruthy();
    });

    it('is expected to call the service with a NINO and ISO formatted date', function() {
        spyOnSuccessful();
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        coreController.model.nino='AA123456A';
        coreController.submit()
        expect(restService.checkApplication).toHaveBeenCalledWith('AA123456A', '2015-2-1','');
    });

    it('is expected to call the service with a NINO, ISO formatted date and dependants', function() {
        spyOnSuccessful();
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='02';
        coreController.model.fromDateYear='2016';
        coreController.model.nino='AA123456b';
        coreController.model.dependants=2;
        coreController.submit()
        expect(restService.checkApplication).toHaveBeenCalledWith('AA123456B', '2016-02-1',2);
    });

    it('sets returned data from service on the model ', function(){
       spyOnSuccessful();
       response = {
                    status: {
                      code: "100",
                      message: "OK"
                    },
                    individual: {
                      title: "Mr",
                      forename: "Peter",
                      surname: "Jones",
                      nino: "PJ123456A"
                    },
                    categoryCheck: {
                      category: "A",
                      passed: false,
                      applicationRaisedDate: "2015-07-03",
                      assessmentStartDate: "2015-01-02",
                      failureReason: "NOT_ENOUGH_RECORDS"
                    }
                  };

       coreController.model.fromDateDay=3;
       coreController.model.fromDateMonth=7;
       coreController.model.fromDateYear=2015;
       coreController.model.nino='PJ123456A';
       coreController.model.dependants=0;

       coreController.submit()
       scope.$digest()

       expect(coreController.model.individual.forename).toBe("Peter");
       expect(coreController.model.individual.surname).toBe("Jones");
       expect(coreController.model.individual.nino).toBe("PJ123456A");

       expect(coreController.model.meetsFinancialRequirements).toBeFalsy();
       expect(coreController.model.failureReason).toBe("NOT_ENOUGH_RECORDS");

       expect(restService.checkApplication.calls.count()).toBe(1);
    });

    it('handles invalid nino error from service', function(){
       spyOnNinoFailure();

       coreController.model.fromDateDay=1;
       coreController.model.fromDateMonth=2;
       coreController.model.fromDateYear=2015;
       coreController.model.nino='AA123456A';

       coreController.submit()
       scope.$digest();

       expect(coreController.ninoInvalidError).toBeTruthy();
       expect(coreController.restError).toBeTruthy();

       expect(restService.checkApplication.calls.count()).toBe(1);
    });

});