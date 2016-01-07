angular.module('nblanding').directive('verification', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/verification/verification.html',
        controllerAs: 'verification',
        controller: verificationCtrl
    }
});

function verificationCtrl($scope, $stateParams, $reactive) {
    $reactive(this).attach($scope);

    this.isValid = null;
    this.email = $stateParams.email;
    this.vcode = $stateParams.vcode;
    (function (v) {
        Meteor.call('verify', v.email, v.vcode, function (error, result) {
            if (error) {
                alert(error.message);
            } else {
                if (result === 'true') {
                    v.isValid = true;
                } else {
                    v.isValid = false;
                }
            }
        });
    })(this);
}