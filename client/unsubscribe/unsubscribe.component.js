angular.module('nblanding').directive('unsubscribe', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/unsubscribe/unsubscribe.html',
        controllerAs: 'unsubscribe',
        controller: unsubscribeCtrl
    }
});

function unsubscribeCtrl($scope) {
    this.unsub = function(){
        
    }
    
    this.staysub = function(){
        
    }
}