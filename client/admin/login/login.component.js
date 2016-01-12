angular.module('nblanding').directive('adminLogin', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/admin/login/login.html',
        controllerAs: 'adminLogin',
        controller: adminLoginCtrl
    }
});

function adminLoginCtrl($scope, $state) {
    if (Meteor.userId()) {
        $state.go('admin.subscribers');
    }

    this.login = function () {
        Meteor.loginWithPassword({
                username: this.username
            }, this.password,

            function (error) {
                if (error) {
                    alert("Error! Invalid username or password!");
                } else {
                    $state.go('admin.subscribers');
                }
            });

        this.username = "";
        this.password = "";
    }
}