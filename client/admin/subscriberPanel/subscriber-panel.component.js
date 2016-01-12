angular.module('nblanding').directive('subscriberPanel', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/subscriberPanel/subscriber-panel.html',
        controllerAs: 'subscriberPanel',
        controller: subscriberPanelCtrl
    }
});

function subscriberPanelCtrl($scope, $reactive) {
    $reactive(this).attach($scope);
    var subscriberPanel = this;

    this.subscribe('subscribers');

    this.helpers({
        subscribers: () => {
            return Subscribers.find({})
        },
        verified: () => {
            return Subscribers.find({
                isVerified: true
            });
        }
    });

    this.deleteSub = function (id) {
        bootbox.confirm("Are you sure?", function (isOk) {
            if (isOk)
                Meteor.call('removeSub', id);
        });
    }

    this.viewSub = function (subObj) {
        var detailStr = '<table class="table table-bordered">';

        for (var p in subObj) {
            detailStr += '<tr><th>' + p + '</th><td>' + subObj[p] + '</td>'
        }
        detailStr += '</table>';

        bootbox.dialog({
            title: 'Verified Mail Text List',
            message: detailStr,
            size: 'large',
            closeButton: true,
            backdrop: true
        });
    }

    this.textList = {
        open: function () {

            if (subscriberPanel.verified.length === 0)
                return "";

            var listStr = subscriberPanel.verified[0].email;
            for (var i = 1; i < subscriberPanel.verified.length; i++) {
                listStr += '; ' + subscriberPanel.verified[i].email;
            }

            bootbox.dialog({
                title: 'Verified Mail Text List',
                message: '<div class="well"><p>' + listStr + '</p></div>',
                closeButton: true,
                backdrop: true
            });
        }
    }
}