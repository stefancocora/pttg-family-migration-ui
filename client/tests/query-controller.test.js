describe('coreController', function(){

   var location;
   var coreController;
   var scope;
   var restService;
   var form;

    beforeEach(module("app.core"));

    beforeEach(module('templates'));

    beforeEach(inject(function($q){
        restService = {
            checkApplication : function(nino, applicationRaisedDate, dependants) {
            }
        };

        spyOn(restService, 'checkApplication').and.callFake(function() {
             var deferred = $q.defer();
             var returnValue="65765";
             deferred.resolve(returnValue);
             return deferred.promise;
         });

     }));

    beforeEach(inject(function($rootScope, $controller, $location, $templateCache, $compile,  $anchorScroll) {
        scope=$rootScope.$new();
        location = $location;

        coreController = $controller('coreController as vm', { '$scope' : scope, '$location' : location, 'restService' : restService, '$anchorScroll' : $anchorScroll } );

        templateHtml = $templateCache.get('client/views/income-proving-query.html')

        console.log(templateHtml);

        formElem = angular.element("<div>" + templateHtml + "</div>");
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

    it('is expected to trap a missing NINO', function(){

        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        coreController.model.nino='AA1234A';

        //form.nino.$setViewValue=''

        coreController.submit();
        expect(coreController.validateError).toBeFalsy();
    });

    it('is expected to call the service a NINO and ISO formatted date', function() {
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        coreController.model.nino='AA123456A';
        coreController.submit()
        expect(restService.checkApplication).toHaveBeenCalledWith('AA123456A', '2015-2-1','');
    });

    it('is expected to call the service a NINO, ISO formatted date and dependants', function() {
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='02';
        coreController.model.fromDateYear='2016';
        coreController.model.nino='AA123456b';
        coreController.model.dependants=2;
        coreController.submit()
        expect(restService.checkApplication).toHaveBeenCalledWith('AA123456B', '2016-02-1',2);
    });

});