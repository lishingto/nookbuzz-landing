angular.module('nblanding').directive('subscriberPanel', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/subscriberPanel/subscriber-panel.html',
        controllerAs: 'subscriberPanel',
        controller: subscriberPanelCtrl
    }
});

function subscriberPanelCtrl($scope, $reactive, $modal) {
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
        Meteor.call('removeSub', id);
    }

    this.textList = {
        open: function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'emailList.html',
                controllerAs: 'emailList',
                controller: emailListCtrl,
                size: 'lg',
                resolve: {
                    mails: function () {
                        if (subscriberPanel.verified.length === 0)
                            return "";

                        var listStr = subscriberPanel.verified[0].email;
                        for (var i = 1; i < subscriberPanel.verified.length; i++) {
                            listStr += '; ' + subscriberPanel.verified[i].email;
                        }
                        return listStr;
                    }
                }
            });
        }
    }
}

function emailListCtrl($scope, $modalInstance, mails) {
    this.mails = mails;
    this.close = function () {
        $modalInstance.dismiss();
    }
}