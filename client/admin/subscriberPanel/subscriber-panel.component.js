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

    this.subscribe('subscribers');

    this.helpers({
        subscribers: () => {
            return Subscribers.find({})
        }
    });
    
    this.deleteSub = function(id){
        Meteor.call('removeSub', id);   
    }
}