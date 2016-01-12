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

    var msgList = {
        loading: "Please Wait, While we verify your email ...",
        already: "Your email has been verified previously. Thank You for your Interest in NookBuzz!",
        valid: "Verification Successful! Thank you for supporting NookBuzz!",
        fail: "Sorry Bad Verification Information, please try again."
    }


    this.validState = "loading";
    this.message = msgList[this.validState];
    this.email = $stateParams.email;
    this.vcode = $stateParams.vcode;


    this.helpers({
        validState: function () {

            return Session.get('validState');
        },
        message: function () {
            return msgList[Session.get('validState')];
        }
    });

    Meteor.call('verify', this.email, this.vcode, function (error, result) {
        var vstate = "fail";
        if (error) {
            bootbox.alert(error);
        } else {
            vstate = result;
        }
        Session.set('validState', vstate);
    });
}