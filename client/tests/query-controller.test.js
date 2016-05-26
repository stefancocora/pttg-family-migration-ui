describe('coreController', function(){

    var location, coreController, form, restService;

    beforeEach(module("app.core"));

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
        formElem = angular.element("<div>" + templateHtml + "</div>")
        $compile(formElem)(scope)
        form = scope.form
        scope.$apply()

    }));

    it('is expected to be defined', function(){
        expect(coreController).toBeDefined();
    });

    it('is expected to get the date in ISO format', function(){
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

    it('is expected the form submits the correct data to the service', function() {
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        coreController.model.nino='AA123456A';
        coreController.submit()
        expect(restService.checkApplication).toHaveBeenCalled();
    });

});