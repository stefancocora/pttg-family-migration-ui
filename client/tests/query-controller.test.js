describe('coreController', function(){
    var controller;

    beforeEach(function (){
        controller = angular.mock.module('app.core');
    });

    it('should be created successfully', function () {
        expect(controller).toBe.defined;
    });

});