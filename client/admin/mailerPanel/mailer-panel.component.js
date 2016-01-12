angular.module('nblanding').directive('mailerPanel', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/mailerPanel/mailer-panel.html',
        controllerAs: 'mailerPanel',
        controller: mailerPanelCtrl
    }
});

function mailerPanelCtrl($scope, $reactive) {
    $reactive(this).attach($scope);

    this.subscribe("mailer");

    this.helpers({
        mailerList: () => {
            return Mailer.find({});
        }
    });


    this.sendMailer = function (mailerId) {
        bootbox.confirm("Are you sure you wish to send?", function (isOk) {
            if (isOk) {
                Meteor.call('sendMailer', mailerId, function (error, result) {
                    if (!error) {
                        bootbox.alert("Mail Sent");
                    } else {
                        bootbox.alert(error);
                    }
                });
            }
        });
    }
}