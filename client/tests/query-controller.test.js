describe('coreController', function(){

    var location, coreController;

    beforeEach(function() {module("app.core") });

    beforeEach(inject(function($rootScope, $controller, $location, $templateCache, $compile,  $anchorScroll ) {
        scope=$rootScope.$new();
        location = $location;
        coreController = $controller('coreController as vm', { '$scope' : scope, '$location' : location, 'restService' : scope, '$anchorScroll' : $anchorScroll } );
    }));

    it('is expected to be defined', function(){
        expect(coreController).toBeDefined();
    });

    it('id expected to get the date in ISO format', function(){
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        expect(coreController.getFullDate()).toEqual('2015-2-1')
    });

    it('id expected to format the date to DD/MM/YYYY', function(){
        coreController.model.fromDateDay='1';
        coreController.model.fromDateMonth='2';
        coreController.model.fromDateYear='2015';
        expect(coreController.formatDate()).toEqual('01/02/2015')
    });

});