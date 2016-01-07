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
                alert("Unable to subscribe: " + error);
            } else {
                alert("Subscribed " + mail);
            }
        });

        this.email = "";
    };
}