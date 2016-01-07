angular.module('nblanding').directive('adminParent', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/admin.html',
        controllerAs: 'adminParent',
        controller: adminParentCtrl
    }
});

function adminParentCtrl($scope, $state) {
    
    this.logout = function(){
        Meteor.logout(function(){
               $state.go('index');
        });
    }
}