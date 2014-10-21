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
                        		   currentPage:1,
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

                         // 展示详细
                         $scope.detailItem = function(index,event){
                          event.target.setAttribute('data-toggle','modal');
                          event.target.setAttribute('data-target','#myDetailModal');
                         }

                        //获取Grid数据方法
                        var reGetDatas = function(){
                            var postData = {
                                currentPage: $scope.paginationConf.currentPage,
                                itemsPerPage: $scope.paginationConf.itemsPerPage
                            }

                            $http.get('http://localhost:8080/employee-manage/admin/getcar',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
                            $scope.dataStore = dataStore = data.returnData.item;
                            $scope.formDataResult = data.returnData.item;
                            $scope.paginationConf.currentPage = data.returnData.currentPage;
                            $scope.paginationConf.totalItems = data.returnData.totalItems;
                            $scope.paginationConf.itemsPerPage = data.returnData.itemsPerPage;
                         });
                        }

                        //坚挺当前页面和每页条数来获取grid数据
                        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reGetDatas);

                    }
                },
                'footer@index':{
                    templateUrl:'jsp/view/adminView/footer.html'
                }
            }
        })
        .state('index.customer', {
            url: '/customer',
            views: {
                'main@index': {
                    templateUrl: 'jsp/view/adminView/customerManage/customer.html',
                }
            }
        })
        .state('index.customer.addCustomer',{
          url:'/addCustomer',
          templateUrl:'jsp/view/adminView/customerManage/addCustomerform.html',
          controller:function($scope,$state){
           
          }
        })
        .state('index.customer.sourcedata', {
            url: '/sourcedata',
            views: {
                'main@index': {
                    templateUrl:'jsp/view/adminView/sourceDataManage/customerDataImport.html'
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

                  //新增车源
                  $scope.addCarObject = {
                  	isTop:"",
                  	saleRegion:"",
                  	configuration:"",
                  	customerManager:"",
                  	carColor:"",
                  	carDecoration:"",
                  	dealer:"",
                  	price:"",
                  	principal:"",
                  	region:"",
                  	type:"",
                  	carTyeId:"",
                  	telphone:""
                  };

            }
        })
        .state('index.carmanage.addCarType', {
            url: '/addCarType',
            templateUrl: 'jsp/view/adminView/carManage/carTypeManage/addCarTypeform.html',
            controller: function($scope, $state,$http) {
                $scope.backToPrevious = function() {
                    window.history.back();
                };
                /**
                 * 新增车型
                 */
                $scope.saveCarType = function(event) {
                	console.log(event.target);
                    var postData = {
                        brand: $scope.addCartTypeConfig.brand,
                        type: $scope.addCartTypeConfig.type
                    };
                    console.log(postData);
                	$http.post("",postData).success(function(data){
                		if(data == success){
                			console.log("新增车型成功！");
                		}else{
                			console.log("新增成型失败！");
                		}
                	})
                };
                
//                新增参数
                $scope.addCartTypeConfig = {
                		brand:"",
                		type:""
                };
                
                //获取Grid数据方法
                var reGetCarTypeDatas = function(){
                	
                    $http.get('http://localhost:8080/employee-manage/admin/getcartype').success(function(data){
                    $scope.dataStore = dataStore = data;
                    $scope.carTypeResult = data;
                 });
                };
                //获取车型数据
                reGetCarTypeDatas();
             
            }
        })
        .state('index.carmanage.sourcedata', {
            url: '/sourcedata',
            views: {
                'main@index': {
                    templateUrl:'jsp/view/adminView/sourceDataManage/carSourceDataImport.html'
                }
            }
        })
        .state('index.settings', {
            url: '/settings',
            views: {
                'main@index': {
                    templateUrl:'jsp/view/adminView/testPage/testPage.html'
                    }
                }
           
        })
});

// 权限访问
routerApp.factory('authService', function($http){
  var userRole = [];
  var userRoleRouteMap = {
    'ROLE_ADMIN':['/admin/**'],
    'ROLE_USER':['/user']
  }
  return {
 
        userHasRole: function (role) {
            for (var j = 0; j < userRole.length; j++) {
                if (role == userRole[j]) {
                    return true;
                }
            }
            return false;
        },
 
        isUrlAccessibleForUser: function (route) {
            for (var i = 0; i < userRole.length; i++) {
                var role = userRole[i];
                var validUrlsForRole = userRoleRouteMap[role];
                if (validUrlsForRole) {
                    for (var j = 0; j < validUrlsForRole.length; j++) {
                        if (validUrlsForRole[j] == route)
                            return true;
                    }
                }
            }
            return false;
        }
    };
});

// 按钮显示控制指令
// 属性形式
routerApp.directive('myAccess', ['authService', 'removeElement', function (authService, removeElement) {
    return{
        restrict: 'A',
        link: function (scope, element, attributes) {
 
            var hasAccess = false;
            var allowedAccess = attributes.myAccess.split(" ");
            for (i = 0; i < allowedAccess.length; i++) {
                if (authService.userHasRole(allowedAccess[i])) {
                    hasAccess = true;
                    break;
                }
            }
 
            if (!hasAccess) {
                angular.forEach(element.children(), function (child) {
                    removeElement(child);
                });
                removeElement(element);
            }
 
        }
    }
}]).constant('removeElement', function(element){
    element && element.remove && element.remove();
});


/**
 * 文件上传指令
 */
routerApp.directive('fileUploader', ['', function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    controller: function($scope, $fileUpload) {
      $scope.notReady = true;
      $scope.upload = function(){
        $fileUpload.upload($scope.files);
      };
    },
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: '<div><input type="file" multiple/><button ng-click="upload()">上传</button></div>'+
              '<ul><li ng-repeat="file in files">-</li></ul>',
    // templateUrl: '',
    // replace: true,
    transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope,$element) {
      var fileInput = $element.find('input[type="file"]');
      fileInput.bind('change',function(e){
        $scope.notReady = e.target.files.length == 0;
        $scope.files = [];
        for(i in e.target.files){
          if(typeof e.target.files[i] == 'Object')
            $scope.files.push(e.target.files[i]);
        }
      });
    }
  };
}]);


/**
 * 文件上传服务
 */
routerApp.service('$fileUpload', ['$http', function($http){
  this.upload = function(files){
    var formData = new formData();
    for(i in files){
      formData.append('file_'+i,files[i]);
    }
    console.log(formData);
    $http({
      method:'POST',
      url:'',
      data:formData,
      headers:{'Content-Type':undefined},
      transformRequest:angular.identity
    }).success(function(data,status,headers,config){

    });
  }
}])
