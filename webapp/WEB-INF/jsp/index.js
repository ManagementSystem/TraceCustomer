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
                    controller: function($scope, $state,$http) {
                        /*每页展示*/
                        var dataStore;
                        var dataEditItem;
                        $scope.paginationConf = {
                                   itemsPerPage: 10,
                                   totalItems:30
                               };

                        
                         $scope.maxSize = 5;

                         $scope.setPage = function (pageNo) {
                           $scope.currentPage = pageNo;
                         };

                         $scope.pageChanged = function() {
                           console.log('Page changed to: ' + $scope.currentPage);
                         };

                         /*编辑方法*/
                         $scope.editItem = function(index,event){
                            /*取得选择行的数据*/
                           console.log(dataStore[index]);
                           $scope.dataEditItem = dataStore[index];
                           /*获得该节点*/
                           console.log(event.target);
                           event.target.setAttribute('data-toggle','modal');
                           event.target.setAttribute('data-target','#myEditModal');

                         }
                         /*新增方法*/
                         $scope.addItem = function(event){
                           event.target.setAttribute('data-toggle','modal');
                           event.target.setAttribute('data-target','#myAddModal');
                         }

                         /*删除方法*/
                         $scope.delItem = function(index,event){
                            event.target.setAttribute('data-toggle','modal');
                           event.target.setAttribute('data-target','#myDelModal');
                         }

                         //grid中数据展示
                       $scope.formHeadResult = [
                            {head:'Name'},
                            {head:'Mr/Miss'},
                            {head:'PhoneNumber'},
                            {head:'Area'},
                            {head:'CarType'},
                            {head:'Configure'},
                            {head:'Color'},
                            {head:'Inside'},
                            {head:'Operation'}
                        ];
                        var reGetDatas = function(){
                            var postData = {
                                currentPage: $scope.paginationConf.currentPage,
                                itemsPerPage: $scope.paginationConf.itemsPerPage
                            }

                            $http.get('jsp/data.json').success(function(data){
                            $scope.dataStore = dataStore = data.item;
                            $scope.formDataResult = data.item;
                            $scope.paginationConf.currentPage = data.currentPage;
                            $scope.paginationConf.totalItems = data.totalItems;
                            $scope.paginationConf.itemsPerPage = data.itemsPerPage;
                         });
                        }

                        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reGetDatas);

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
