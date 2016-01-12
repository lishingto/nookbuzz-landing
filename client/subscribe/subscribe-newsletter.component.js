angular.module('nblanding').directive('subscribeNewsletter', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/subscribe/subscribe-newsletter.html',
        controllerAs: 'subscribeNewsletter',
        controller: subscribeNewsletterCtrl
    }
});

function subscribeNewsletterCtrl($scope) {

    this.email = "";

    this.thanks = function () {
        var mail = this.email;
        Meteor.call('subscribe', mail, function (error, result) {
            if (error) {
                bootbox.alert("Unable to subscribe: " + error);
            } else {
                bootbox.dialog({
                    title: 'Thank You for Subscribing!',
                    message: '<p>You are now subscribed to receiving information about NookBuzz!</p>' +
                    '<p><strong>'+mail+'</strong></p>'
                    + '<p>An email with a verification link has been sent to the email address listed above</p>',
                    closeButton: true,
                    backdrop: true
                });
            }
        });

        this.email = "";
    };
}