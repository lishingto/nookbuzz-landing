angular.module('nblanding').directive('mailerPanel', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/mailerPanel/mailer-panel.html',
        controllerAs: 'mailerPanel',
        controller: mailerPanelCtrl
    }
});

function mailerPanelCtrl($scope) {
    
}