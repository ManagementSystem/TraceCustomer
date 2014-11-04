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
                       $scope.ReturnMsg = false;
                        $scope.CarShow = true;
//                        切换车源还是客源
                        $scope.changeDataType = function(event){
                        	$scope.CarShow = !($scope.CarShow);
                        };
                        
//                        车源的数据缓存和pageBar设置
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
//                           编辑item的数据项
                           $scope.editCarObject = dataStore[index];
                          
                           /*获得该节点*/
                           event.target.setAttribute('data-toggle','modal');
                           event.target.setAttribute('data-target','#myEditModal');

                         };
                         
//                         确认修改
                         $scope.saveEditCarSource = function(event){
                        	 var postData = $scope.editCarObject;
                        	
                        	 $http.post("http://localhost:8080/employee-manage/admin/createcar",postData).success(function(data){
                           		if(data == "success"){
                           			console.log(data);
//                           	    修改后刷新车源列表
//                           	  reGetDatas();
//                           	     关闭模态框
                           			
//                           	     置空修改项
//                           	  $scope.editCarObject = {};
                           			
                           		}else{
                           			console.log("Save Faild!");
                           		}
                           	});
                         };
                         
                         /*删除方法*/
                         $scope.delItem = function(index,event){
                           $scope.delItemId = dataStore[index].id;
                           event.target.setAttribute('data-toggle','modal');
                           event.target.setAttribute('data-target','#myDelModal');
                         };
                         
//                         确认删除
                         $scope.deleCarData = function(event){
                        	 if($scope.CarShow){
                            	 $http.get('http://localhost:8080/employee-manage/admin/delcar',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:{id:$scope.delItemId}}).success(function(data){
                                    if(data == "success"){
                                    	console.log("Del Success!");
                                    	$scope.SuccessMsgShow = true;
                                     	$scope.returnSuccessMsg = 'Good job,Well done.';
                                     	event.target.setAttribute('data-toggle','modal');
                                        event.target.setAttribute('data-target','#myMsgModal');
                                    }else{
                                    	console.log("Del Faild");
                                    	$scope.SuccessMsgShow = false;
                                     	$scope.returnErrorMsg = 'Sorry,Error happend.';
                                     	event.target.setAttribute('data-toggle','modal');
                                        event.target.setAttribute('data-target','#myMsgModal');
                                    	
                                    }
                                  }).error(function(data){
                                	  $scope.SuccessMsgShow = false;
	                                  $scope.returnErrorMsg = 'Sorry,Error happend in Ajax Posting.';
	                                  event.target.setAttribute('data-toggle','modal');
                                      event.target.setAttribute('data-target','#myMsgModal');
                                  });
                                  
                                  ; 
                        	 }else{
                        		 
                        	 }
                        	
                          
                         };

                         // 展示车源详细
                          $scope.detailItem = function(index,event){
	                          $scope.carSourceDetail = dataStore[index];
	                          event.target.setAttribute('data-toggle','modal');
	                          event.target.setAttribute('data-target','#myDetailModal');
                         };
                         
                        
                         
//                         客源的数据缓存和pageBar设置
                         var dataStoreForCustomer;
                         var dataEditItemForCustomer;
                         $scope.paginationConfForCustomer = {
                         		   	currentPage:1,
                                    itemsPerPage: 5,
                                    totalItems:30
                                };
                          $scope.maxSize = 5;
                          
                          //客源详细的弹出窗
                          $scope.detailCoustomerItem = function(index,event){
                        	  $scope.coustomerSourceDetail = dataStoreForCustomer[index];
	                          
	                          event.target.setAttribute('data-toggle','modal');
	                          event.target.setAttribute('data-target','#myCustomerDetailModal');
                          }
                          
                          //客源新增回访记录
                         $scope.addReportRow = function(event){
                        	 $scope.addReMarks = !$scope.addReMarks;
                         } 

                          //客源编辑弹窗
                          $scope.editCoustomerItem = function(index,event){
                        	  console.log(dataStoreForCustomer[index]);
                              event.target.setAttribute('data-toggle','modal');
                              event.target.setAttribute('data-target','#myeditCoustomerModal');
                              $scope.editCustomerObject = dataStore[index];
                            };
                            
//                       客源删除
                         $scope.delCoustomerItem = function(index,event){
                        	 $scope.delItemName = dataStoreForCustomer[index].name;
                             event.target.setAttribute('data-toggle','modal');
                             event.target.setAttribute('data-target','#myDelModal');
                         };
                        //获取Grid数据方法
                        var reGetDatas = function(){
                           
//                            请求车源还是客源的URL
                            if($scope.CarShow){
                            	 var postData = {
                                         currentPage: $scope.paginationConf.currentPage,
                                         itemsPerPage: $scope.paginationConf.itemsPerPage
                                     };
                            	 $http.get('http://localhost:8080/employee-manage/admin/getcar',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
                            		 $scope.ajaxMsg ="Get CarSource Data Success!";
                            		 $scope.dataStore = dataStore = data.returnData.item;
                                     $scope.formDataResult = data.returnData.item;
                                     $scope.paginationConf.currentPage = data.returnData.currentPage;
                                     $scope.paginationConf.totalItems = data.returnData.totalItems;
                                     $scope.paginationConf.itemsPerPage = data.returnData.itemsPerPage;
                                  });
                            }else{
                            	 var postData = {
                                         currentPage: $scope.paginationConfForCustomer.currentPage,
                                         itemsPerPage: $scope.paginationConfForCustomer.itemsPerPage
                                     };
                            	 $http.get('http://localhost:8080/employee-manage/admin/getcustomer',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
                                     if(data.returnState == "success"){
                                    	 $scope.ajaxMsg ="Get CustomerSource Data Success!";
                                    	 $scope.dataStoreForCustomer = dataStoreForCustomer = data.returnData.item;
                                         $scope.formDataResultForCustomer = data.returnData.item;
                                         $scope.paginationConfForCustomer.currentPage = data.returnData.currentPage;
                                         $scope.paginationConfForCustomer.totalItems = data.returnData.totalItems;
                                         $scope.paginationConfForCustomer.itemsPerPage = data.returnData.itemsPerPage;
                                     }else{
                                    	 $scope.ajaxMsg = "Get CustomerSource Data Error!";
                                    }
                            		 
                                  });
                            }

                           
                        };
                        
//                        搜索方法
                        $scope.searchGridData = function(event){
                        	if($scope.CarShow){
                        		var postData = $scope.carSourceSearch;
                        		$http.get('http://localhost:8080/employee-manage/admin/getcar',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
                        			console.log("SearchSuccess!");
                                 }).error(function(data){
                                	 console.log("Faild!");
                                 });
                        	}else{
                        		var postData = $scope.customerSearch;
                        		$http.get('http://localhost:8080/employee-manage/admin/getcustomer',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
                        			console.log("SearchSuccess!");
                                 }).error(function(data){
                                	 console.log("Faild!");
                                 });
                        	}
                        };
                        
                        
                        //监听当前页面和每页条数来获取grid数据
                        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage + CarShow +paginationConfForCustomer.currentPage + paginationConfForCustomer.itemsPerPage', reGetDatas);

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
          controller:function($scope,$state,$http){
//        	  客户类
              $scope.customerObjects = {
           		name:"",
           		phone:"",
           		region:"",
           		budgetRange:"",
           		carColor:"",
           		decoration:"",
           		installment:"",
           		insurance:"",
           		level:"",
           		ispublice:"",
           		deadline:"",
           		customerType:"",
           		carType:"",
           		sex:"",
           		property:"",
           		remarks:""
              };

//        	  车型
        	  $http.get('http://localhost:8080/employee-manage/admin/getcartype').success(function(data){
                  $scope.TypeOptions = data;
               });
        	  
        	  
//        	  预算区间
        	  $scope.budgetRangeOptions = ["5W-10W","10W-15W","15W-20W","20W-30W","30W-40W","40W-60W","60W-80W","80W-100W"];
        	  $scope.customerObjects.budgetRange = $scope.budgetRangeOptions[0];
           
//        	  等级
        	  $scope.levelOptions = ["1","2","3","4"];
        	  $scope.customerObjects.level = $scope.levelOptions[0];
//        	  新增客源
        	  $scope.addCustomer = function(){
        		  var postData = $scope.customerObjects;
        		  $http.post(window.location.origin+"/employee-manage/admin/createcustomer",postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
        			  if(data == "success"){
        				  console.log("Save success!");
        			  }else{
        				  console.log("Save Faild!");
        			  }
        		  }).error(function(data){
        			  console.log("Ajax posting Faild!");
        		  });
        	  }
           
          }
        })
        .state('index.customer.sourcedata', {
            url: '/sourcedata',
            views: {
                'main@index': {
                    templateUrl:'jsp/view/adminView/sourceDataManage/customerDataImport.html',
                    controller: function($scope,$state,$http){
                   	 var showMsg = function(event){
                   		 event.target.setAttribute('data-toggle','modal');
                         	 event.target.setAttribute('data-target','#myMsgModal');
                   	 }
               	
               	//车源文件上传
                   	$scope.upLoadCustomerSourceExcelFile = function(event){
                   		if(event.target.parentNode.childNodes[1].files.length !=0){
                   			var inputFile = event.target.parentNode.childNodes[1].files[0];
                       		if(!(inputFile.name.indexOf(".xls")!=-1 || inputFile.name.indexOf(".xlsx")!=-1)){
                       			$scope.SuccessMsgShow = false;
                                	$scope.returnErrorMsg = 'File formatter is  not Support.';
                       			showMsg(event);
                       		}else if(inputFile.size>=4194304){//文件不超过4M
                       			$scope.SuccessMsgShow = false;
                                	$scope.returnErrorMsg = 'File bigger than 4M is not Support.';
                                	showMsg(event);
                       		}else{
//                       			提交文件
                       			$http.post('',inputFile).success(function(data){
                       				$scope.uploadSuccess = true;
                       				$scope.SuccessMsgShow = true;
                                    	$scope.returnSuccessMsg = 'upLoad Success!';
                                    	showMsg(event);
                       			}).error(function(data){
                       				$scope.uploadFaild = true;
                       				$scope.SuccessMsgShow = false;
                                    	$scope.returnErrorMsg = 'Ajaxing Error';
                                    	showMsg(event);
                       			});
                       		}
                   		}else{
                   			$scope.SuccessMsgShow = false;
                            	$scope.returnErrorMsg = 'Please chose a file!';
                            	showMsg(event);
                   		}
                   		
                   	};
                   }
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
            controller: function($scope, $state,$http) {
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
                  	telphone:""
                  };
                  
                  //初始化各个select组件
//                  区域
                  $scope.areaOptions=['East','South','West','North'];
                  $scope.addCarObject.region=$scope.areaOptions[0];
//                  类型
                  $scope.typeOptions =['Imported','Made in China','Comprehensive'];
                  $scope.addCarObject.type=$scope.typeOptions[0];
//                  可售区域
                  $scope.saleRegionOptions=['Whole Country','Province','Small place'];
                  $scope.addCarObject.saleRegion=$scope.saleRegionOptions[0];
                  
                  $scope.saveCarSource = function(){
                	  var postData = $scope.addCarObject;
                	  
                	  $http.post("http://localhost:8080/employee-manage/admin/createcar",postData).success(function(data){
                  		if(data == "success"){
                  			console.log(data);
//                  			reGetCarTypeDatas();
//                  			$scope.addCartTypeConfig = {
//                              		brand:"",
//                              		type:""
//                              };
                  		}else{
                  			console.log("Save Faild!");
                  		}
                  	});
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
//                设置警告信息显示状态
                $scope.notNullBrand = true;
                $scope.notNullType = true;
                
//              新增参数
              $scope.addCartTypeConfig = {
              		brand:"",
              		type:""
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
                    if($scope.addCartTypeConfig.brand == ""){
                    	$scope.notNullBrand = false;
                    }else if($scope.addCartTypeConfig.type == ""){
                    	$scope.notNullType = false;
                    }else{
                    	$http.post("http://localhost:8080/employee-manage/admin/createcartype",postData).success(function(data){
                    		if(data == "success"){
                    			reGetCarTypeDatas();
                    			$scope.addCartTypeConfig = {
                                		brand:"",
                                		type:""
                                };
                    		}else{
                    			console.log("Save Faild!");
                    		}
                    	});
                    }
                	
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
                    templateUrl:'jsp/view/adminView/sourceDataManage/carSourceDataImport.html',
                    controller: function($scope,$state,$http){
	                    	 var showMsg = function(event){
	                    		 event.target.setAttribute('data-toggle','modal');
	                          	 event.target.setAttribute('data-target','#myMsgModal');
	                    	 }
                    	
                    	//车源文件上传
                        	$scope.upLoadCarSourceExcelFile = function(event){
                        		if(event.target.parentNode.childNodes[1].files.length !=0){
                        			var inputFile = event.target.parentNode.childNodes[1].files[0];
                            		if(!(inputFile.name.indexOf(".xls")!=-1 || inputFile.name.indexOf(".xlsx")!=-1)){
                            			$scope.SuccessMsgShow = false;
                                     	$scope.returnErrorMsg = 'File formatter is  not Support.';
                            			showMsg(event);
                            		}else if(inputFile.size>=4194304){//文件不超过4M
                            			$scope.SuccessMsgShow = false;
                                     	$scope.returnErrorMsg = 'File bigger than 4M is not Support.';
                                     	showMsg(event);
                            		}else{
//                            			提交文件
                            			$http.post('',{data:inputFile}).success(function(data){
                            				$scope.uploadSuccess = true;
                            				$scope.SuccessMsgShow = true;
                                         	$scope.returnSuccessMsg = 'upLoad Success';
                                         	showMsg(event);
                            			}).error(function(data){
                            				$scope.uploadFaild = true;
                            				$scope.SuccessMsgShow = false;
                                         	$scope.returnErrorMsg = 'Ajaxing Error';
                                         	showMsg(event);
                            			});
                            		}
                        		}else{
                        			$scope.SuccessMsgShow = false;
                                 	$scope.returnErrorMsg = 'Please chose a file!';
                                 	showMsg(event);
                        		}
                        		
                        	};
                        }
                }
            }
        })
        .state('index.settings', {
            url: '/settings',
            views: {
                'main@index': {
                    templateUrl:'jsp/view/adminView/testPage/testPage.html',
                    controller:function($scope,$state,$http){
                    	//上传用户excel文件
                    	$scope.upLoadUserExcelFile = function(event){
                    		 var showMsg = function(event){
	                    		 event.target.setAttribute('data-toggle','modal');
	                          	 event.target.setAttribute('data-target','#myMsgModal');
	                    	 }
                    		 
                       		if(event.target.parentNode.childNodes[1].files.length !=0){
                       			var inputFile = event.target.parentNode.childNodes[1].files[0];
                           		if(!(inputFile.name.indexOf(".xls")!=-1 || inputFile.name.indexOf(".xlsx")!=-1)){
                           			$scope.SuccessMsgShow = false;
                                    	$scope.returnErrorMsg = 'File formatter is not Support.';
                           			showMsg(event);
                           		}else if(inputFile.size>=4194304){//文件不超过4M
                           			$scope.SuccessMsgShow = false;
                                    	$scope.returnErrorMsg = 'File bigger than 4M is not Support.';
                                    	showMsg(event);
                           		}else{
//                           			提交文件
                           			$http.post('',inputFile).success(function(data){
                           				$scope.uploadSuccess = true;
                           				$scope.SuccessMsgShow = true;
                                    	$scope.returnSuccessMsg = 'upLoad Success!';
                                    	showMsg(event);
                           			}).error(function(data){
                           				$scope.uploadFaild = true;
                           				$scope.SuccessMsgShow = false;
                                    	$scope.returnErrorMsg = 'Ajaxing Error';
                                    	showMsg(event);
                           			});
                           		}
                       		}else{
                       			$scope.SuccessMsgShow = false;
                                	$scope.returnErrorMsg = 'Please chose a file!';
                                	showMsg(event);
                       		}
                    	};
                    }
                    }
                }
           
        })
        .state('index.reportform', {
            url: '/reportform',
            views: {
                'main@index': {
                    templateUrl:'jsp/view/adminView/reportFormManage/reportForm.html',
                    controller: function($scope,$state,$http){
                      //日期组件
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
                      
                      $scope.open1 = function($event) {
                          $event.preventDefault();
                          $event.stopPropagation();

                          $scope.opened1 = true;
                        };

                      $scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                      };

                      $scope.initDate = new Date('2016-15-20');
                      $scope.formats = ['yyyy/MM/dd'];
                      $scope.format = $scope.formats[0];
               	
               
                    	}
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
