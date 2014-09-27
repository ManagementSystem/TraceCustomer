var routerApp = angular.module('routerApp', ['ui.router','ui.bootstrap']);
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'jsp/view/adminView/index.html',
                    controller: function($scope, $state) {
                        $scope.items = [
                            'The first choice!',
                            'And another choice for you.',
                            'but wait! A third!'
                          ];

                          $scope.status = {
                            isopen: false
                          };

                          $scope.toggled = function(open) {
                            console.log('Dropdown is now: ', open);
                          };

                          $scope.toggleDropdown = function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            $scope.status.isopen = !$scope.status.isopen;
                          };
                        }
                },
                'topbar@index': {
                    templateUrl: 'jsp/view/adminView/topbar.html'
                },
                'main@index': {
                    templateUrl: 'jsp/view/adminView/home.html',
                    controller: function($scope, $state) {
                        var vm = $scope.vm = {};
                        /*每页展示*/
                        vm.page = {
                           size: 5,
                           index: 1
                         };

                         //分页条参数设置
                         $scope.totalItems = 64;
                         $scope.currentPage = 4;

                         $scope.setPage = function (pageNo) {
                           $scope.currentPage = pageNo;
                         };

                         $scope.pageChanged = function() {
                           console.log('Page changed to: ' + $scope.currentPage);
                         };

                         $scope.maxSize = 5;
                         $scope.bigTotalItems = 175;
                         $scope.bigCurrentPage = 1;

                         //grid中数据展示
                        vm.formHeadResult = [
                            {head:'ID Number'},
                            {head:'Name'},
                            {head:'CarType'},
                            {head:'Age'}
                        ];
                        vm.formDataResult = 
                                [   {id:'1',name:'MR Zhang',car:'DZ',age:56},
                                    {id:'2',name:'Miss zhu',car:'DZ',age:56},
                                    {id:'3',name:'MR Zhang',car:'BMW',age:56},
                                    {id:'4',name:'MR Z',car:'DZ',age:56},
                                    {id:'5',name:'MR Zhang',car:'3fff',age:56},
                                    {id:'6',name:'MR Li',car:'DZ',age:56},
                                    {id:'7',name:'MR Zhang',car:'Gddd',age:56},
                                    {id:'8',name:'MR Zhao',car:'DZ',age:56},
                                    {id:'9',name:'MR Hang',car:'Cass',age:56},
                                    {id:'10',name:'MR Hai',car:'DZ',age:56}
                                ];
                    }
                }
            }
        })
        .state('index.customer', {
            url: '/customer',
            views: {
                'main@index': {
                    templateUrl: 'jsp/view/adminView/customerManage/customer.html'
                }
            }
        })
        .state('index.customer.highendusers', {
            url: '/highendusers',
            templateUrl: 'jsp/view/adminView/customerManage/highendusers.html'
        })
        .state('index.customer.normalusers', {
            url: '/normalusers',
            templateUrl: 'jsp/view/adminView/customerManage/normalusers.html'
        })
        .state('index.customer.lowusers', {
            url: '/lowusers',
            templateUrl: 'jsp/view/adminView/customerManage/lowusers.html'
        })
        .state('index.customer.addDirectCustomer', {
            url: '/addDirectCustomer',
            templateUrl: 'jsp/view/adminView/customerManage/addDirectCustomerform.html',
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
            templateUrl: 'jsp/view/adminView/customerManage/addChannelCustomerform.html',
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
                    templateUrl:'jsp/view/adminView/carManage/carManage.html'
                }
            }
        })
        .state('index.carmanage.addCarSource', {
            url: '/addCarSource',
            templateUrl: 'jsp/view/adminView/carManage/carSourceManage/addCarSourceform.html',
            controller: function($scope, $state) {
                $scope.backToPrevious = function() {
                    window.history.back();
                };
                var vm = $scope.vm = {};

                $scope.today = function() {
                        $scope.dt = new Date();
                  };
              $scope.today();

              $scope.clear = function () {
                $scope.dt = null;
              };

              // Disable weekend selection
              $scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
              };
              $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
              };

              $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
              };

              $scope.initDate = new Date('2016-15-20');
              $scope.formats = ['yyyy/MM/dd'];
              $scope.format = $scope.formats[0];
            }
        })
        .state('index.carmanage.addCarType', {
            url: '/addCarSource',
            templateUrl: 'jsp/view/adminView/carManage/carTypeManage/addCarTypeform.html',
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
                    templateUrl:'jsp/view/adminView/sourceDataManage/sourceDataImport.html'
                }
            }
        })
        .state('index.settings', {
            url: '/settings',
            views: {
                'main@index': {
                    template: 'There is some System config'
                }
            }
        })
});
