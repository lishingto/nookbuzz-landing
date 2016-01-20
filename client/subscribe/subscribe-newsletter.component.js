angular.module('nblanding').directive('subscribeNewsletter', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/subscribe/subscribe-newsletter.html',
        controllerAs: 'subscribeNewsletter',
        controller: subscribeNewsletterCtrl
    }
});

function subscribeNewsletterCtrl($scope, $window, $reactive) {

    $reactive(this).attach($scope);

    this.email = "";
    /*
        if ($window.innerWidth / $window.innerHeight <= 1) {
            this.autoFormClass = 'input-group-vertical';
        }*/

    $scope.isFormVertical = ($window.innerWidth / $window.innerHeight) <= 1;

    angular.element($window).bind('resize', function () {

        $scope.isFormVertical = ($window.innerWidth / $window.innerHeight) <= 1;

        // manuall $digest required as resize event
        // is outside of angular
        $scope.$digest();
    });

    this.thanks = function () {
        var mail = this.email;

        var loading = bootbox.dialog({
            title: "Please wait ...",
            message: "Sending your confirmation mail ...",
            closeButton: true
        });

        Meteor.call('subscribe', mail, function (error, result) {
            loading.modal('hide');
            if (error) {
                bootbox.alert("Unable to subscribe: " + error);
            } else {
                bootbox.dialog({
                    title: 'Thank You for Subscribing!',
                    message: '<p>You are now subscribed to receiving information about NookBuzz!</p>' +
                        '<p><strong>' + mail + '</strong></p>' + '<p>An email with a verification link has been sent to the email address listed above</p>',
                    closeButton: true,
                    backdrop: true
                });
            }
        });

        this.email = "";
    };
}