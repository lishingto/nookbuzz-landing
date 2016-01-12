angular.module('nblanding')
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('index', {
                url: '/',
                template: '<subscribe-newsletter></subscribe-newsletter>'
            })

        .state('verify', {
            url: '/verify?email&vcode',
            template: '<verification></verification>'
        })

        .state('unsubscribe', {
            url: '/unsub?email&ucode',
            template: '<unsubscribe></unsubscribe>'
        })

        .state('admin-login', {
            url: '/admin-login',
            template: '<admin-login></admin-login>'
        })

        .state('admin', {
            url: '/admin',
            abstract: true,
            template: '<admin-parent></admin-parent>'
        })

        .state('admin.subscribers', {
            url: '/subscribers',
            parent: 'admin',
            views: {
                admin: {
                    template: '<subscriber-panel></subscriber-panel>'
                }
            },
            resolve: resolver
        })

        .state('admin.mailer', {
                url: '/mailer',
                parent: 'admin',
                views: {
                    admin: {
                        template: '<mailer-panel></mailer-panel>'
                    }
                },
                resolve: resolver
            })
            .state('admin.mailer-form-create', {
                url: '/mailer/create',
                parent: 'admin',
                views: {
                    admin: {
                        template: '<mailer-form></mailer-form>'
                    }
                },
                resolve: resolver
            })
            .state('admin.mailer-form-edit', {
                url: '/mailer/:mailerId',
                parent: 'admin',
                views: {
                    admin: {
                        template: '<mailer-form></mailer-form>'
                    }
                },
                resolve: resolver
            });

        var resolver = {
            currentUser: ($q) => {
                if (Meteor.userId() == null) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                }
            }
        };


        $urlRouterProvider.otherwise("/");
    }).run(function ($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                $state.go('index');
            }
        });
    });