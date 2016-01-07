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

        alert("receiving " + this.email);

        Meteor.call('subscribe', this.email);

        this.email = "";
    };
}