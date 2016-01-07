angular.module('nblanding').directive('unsubscribe', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/unsubscribe/unsubscribe.html',
        controllerAs: 'unsubscribe',
        controller: unsubscribeCtrl
    }
});

function unsubscribeCtrl($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);

    this.helpers({
        state: () => {
            return Session.get('unsubState');
        }
    });

    this.unsub = function () {
        Meteor.call('unsubscribe', $stateParams.email, $stateParams.ucode, function (error, result) {
            Session.set('unsubState', result);
        });
    };

    this.staysub = function () {
        $state.go('index');
    };
}