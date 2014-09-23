var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'view/adminView/index.html'
                },
                'topbar@index': {
                    templateUrl: 'view/adminView/topbar.html'
                },
                'main@index': {
                    templateUrl: 'view/adminView/home.html'
                }
            }
        })
        .state('index.customer', {
            url: '/customer',
            views: {
                'main@index': {
                    templateUrl: 'view/adminView/customerManage/customer.html',
                    controller: function($scope, $state) {
                    	//新增直接用户
                        $scope.addDirectCustomer = function() {
                            $state.go("index.customer.addDirectCustomer");
                        }
                        //新增渠道用户
                        $scope.addChannelCustomer = function() {
                            $state.go("index.customer.addChannelCustomer");
                        }

                    }
                }
            }
        })
        .state('index.customer.highendusers', {
            url: '/highendusers',
            templateUrl: 'view/adminView/customerManage/highendusers.html'
        })
        .state('index.customer.normalusers', {
            url: '/normalusers',
            templateUrl: 'view/adminView/customerManage/normalusers.html'
        })
        .state('index.customer.lowusers', {
            url: '/lowusers',
            templateUrl: 'view/adminView/customerManage/lowusers.html'
        })
        .state('index.customer.addDirectCustomer', {
            url: '/addDirectCustomer',
            templateUrl: 'view/adminView/customerManage/addDirectCustomerform.html',
            controller: function($scope, $state) {
                $scope.backToPrevious = function() {
                    window.history.back();
                };
                $scope.customerLevel = '普通用户';
                $scope.customerLevelOptions = {
                    customerLevel:[
                    '普通用户',
                    'VIP用户',
                    'VVIP用户'
                    ]
                };

                //性别
                $scope.gender ='男';
                $scope.genderOptions = {
                    gender:['男','女']
                }

                //预算
                $scope.budget ='5万以下';
                $scope.budgerOptions = {
                    budget:['5万以下',
                            '5万到10万',
                            '10万到30万',
                            '30万到60万',
                            '60万到90万',
                            '90万到120万',
                            '120万到200万',
                            '200万以上',]
                }
                
                //按揭
                var mortgage = $scope.mortgage = {};
                //保险
                var safe = $scope.safe = {};
                //公客、私客
                $scope.privateCustomer = '公客';
                $scope.privateableOptions = {
                  privateCustomer: ['公客','私客']
                };
            }
        })
        .state('index.customer.addChannelCustomer', {
            url: '/addChannelCustomer',
            templateUrl: 'view/adminView/customerManage/addChannelCustomerform.html',
            controller: function($scope, $state) {
                $scope.backToPrevious = function() {
                    window.history.back();
                }
                

                //性别
                $scope.gender ='男';
                $scope.genderOptions = {
                    gender:['男','女']
                }

                //预算
                $scope.budget ='5万以下';
                $scope.budgerOptions = {
                    budget:['5万以下',
                            '5万到10万',
                            '10万到30万',
                            '30万到60万',
                            '60万到90万',
                            '90万到120万',
                            '120万到200万',
                            '200万以上',]
                }
            }
        })
        .state('index.carmanage', {
            url: '/carmanage',
            views: {
                'main@index': {
                    templateUrl:'view/adminView/carManage/carManage.html',
                    controller: function($scope, $state) {
                    	//新增直接用户
                        $scope.addCarSource = function() {
                            $state.go("index.carmanage.addCarSource");
                        }
                        //新增渠道用户
                        $scope.addCarType = function() {
                            $state.go("index.carmanage.addCarType");
                        }
                    }
                }
            }
        })
        .state('index.carmanage.addCarSource', {
            url: '/addCarSource',
            templateUrl: 'view/adminView/carManage/carSourceManage/addCarSourceform.html',
            controller: function($scope, $state) {
                $scope.backToPrevious = function() {
                    window.history.back();
                };
                var vm = $scope.vm = {};

                  //初始化日期
                  vm.today = function() {
                    vm.calendar = new Date();
                  };
                  vm.today();

                  //清除当前日期
                  vm.clear = function() {
                    vm.calendar = null;
                  };


                  // 不允许选择周末
                  vm.disabled = function(date, mode) {
                    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                  };

                  //最小日期开关
                  vm.toggleMin = function() {
                    vm.minDate = vm.minDate ? null : new Date();
                  };
                  vm.toggleMin();

                  //弹出式日历触发函数
                  vm.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                  };

                  //自定义选项
                  vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1,
                    formatDayTitle: 'yyyy MMMM'
                  };

                  //输出格式控制,来源:官方date filter
                  vm.formats = ['yyyy-MMMM-dd', 'yyyy/MM/dd', 'yyyy.MM.dd', 'shortDate'];
                  vm.format = vm.formats[1];
            }
        })
        .state('index.carmanage.addCarType', {
            url: '/addCarSource',
            templateUrl: 'view/adminView/carManage/carSourceManage/addCarTypeform.html',
            controller: function($scope, $state) {
                $scope.backToPrevious = function() {
                    window.history.back();
                }
            }
        })
        .state('index.sourcedata', {
            url: '/sourcedata',
            views: {
                'main@index': {
                    templateUrl:'view/adminView/sourceDataManage/sourceDataImport.html'
                }
            }
        })
        .state('index.settings', {
            url: '/settings',
            views: {
                'main@index': {
                    template: '这里是系统设置'
                }
            }
        })
});
