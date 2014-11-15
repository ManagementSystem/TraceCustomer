var routercustomerApp = angular.module('routercustomerApp', ['ui.router','ui.bootstrap']);
routercustomerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/customer');
    $stateProvider
        .state('customer', {
            url: '/customer',
            views: {
                '': {
                    templateUrl: 'jsp/view/customerView/index.html'
                },
                'topbar@customer': {
                    templateUrl: 'jsp/view/customerView/topbar.html',
                    controller: function($scope, $state,$http) {
                    	$scope.oldPassWord ="";
                    	$scope.newPassWord ="";
                    	$scope.newPassWordAgain ="";
                    	//修改密码方法
                    	$scope.changPassWord = function(event){
                    		$http.post('').
                    		success(function(data){
                    			
                    		}).
                    		error(function(data){
                    			
                    		});
                    	};
                    }
                },
                'main@customer': {
                    templateUrl: 'jsp/view/customerView/home.html',
                    controller: function($scope, $state,$http) {
                       $scope.ReturnMsg = false;
                        
//                         客源的数据缓存和pageBar设置
                         var dataStoreForCustomer;
                         var dataEditItemForCustomer;
                         $scope.paginationConfForCustomer = {
                         		   	currentPage:1,
                                    itemsPerPage: 5,
                                    totalItems:30
                                };
                          $scope.maxSize = 5;
                          //获取客源回访内容的数据
                          var getCoustomerRemarks = function(id){
                        	  var postData = {
                        			'customerid':id  
                        	  }
                        	  $http.get(window.location.origin+'/employee-manage/admin/getcustomerremarks',{params:postData}).
                        	  success(function(data){
                        		  if(data.returnState = "success"){
                        			  $scope.coumosterRemarkItems = data.returnData.item;
                        		  }
                        	  }).
                        	  error(function(data){
                        		  console.log('Get coustomer remarks error!');
                        	  });
                          };
                          
                          //客源详细的弹出窗
                          $scope.detailCoustomerItem = function(index,event){
                        	  $scope.coustomerSourceDetail = dataStoreForCustomer[index];
                        	  getCoustomerRemarks(dataStoreForCustomer[index].id);
	                          event.target.setAttribute('data-toggle','modal');
	                          event.target.setAttribute('data-target','#myCustomerDetailModal');
                          };
                          
                          //客源新增回访记录
                         $scope.addCoustomerReMarksRow = function(event){
                        	 $scope.addReMarks = !$scope.addReMarks;
                         };
                       
//                         新增客源回访记录提交
                         $scope.addRemarks = function(event){
                        	 var postData = {
                        			 'content':$scope.addreMarksObj.content,
                        			 'customerId':$scope.coustomerSourceDetail.id,
                        			 'type':$scope.addreMarksObj.type
                        	 };
                        	 var showMsg = function(event){
                           		 event.target.setAttribute('data-toggle','modal');
                                 	 event.target.setAttribute('data-target','#myMsgModal');
                           	 };
                        	 $http.post(window.location.origin+'/employee-manage/admin/addcustomerremark',postData).success(function(data){
                        		if(data == 'success'){
                        			//提示成功信息
                        			$scope.SuccessMsgShow = true;
                                 	$scope.returnSuccessMsg = 'add ReMarks Success!';
                                 	showMsg(event);
                                 	$scope.addReMarks = !$scope.addReMarks;
                                 	$scope.addreMarksObj = {};
                                 	getCoustomerRemarks($scope.coustomerSourceDetail.id);
                        		}else{
                        			$scope.SuccessMsgShow = false;
                                  	$scope.returnErrorMsg = 'add ReMarks Faild!';
                                  	showMsg(event);
                        		}
                        	 }).error(function(data){
                        		$scope.SuccessMsgShow = false;
                              	$scope.returnErrorMsg = 'add ReMarks Faild!';
                              	showMsg(event);
                        	 });
                         };

                         
                        //获取Grid数据方法
                        var reGetDatas = function(){
                    	 var postData = {
                                 currentPage: $scope.paginationConfForCustomer.currentPage,
                                 itemsPerPage: $scope.paginationConfForCustomer.itemsPerPage
                             };
                    	 $http.get(window.location.origin+'/employee-manage/admin/getcustomer',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
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
                           
                        };
                        
//                        搜索方法
                        $scope.searchGridData = function(event){
	                		var postData = $scope.customerSearch;
	                		$http.get(window.location.origin+'/employee-manage/admin/getcustomer',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
	                			console.log("SearchSuccess!");
	                         }).error(function(data){
	                        	 console.log("Faild!");
	                         });
                        };
                        
                        
                        //监听当前页面和每页条数来获取grid数据
                        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage + CarShow +paginationConfForCustomer.currentPage + paginationConfForCustomer.itemsPerPage', reGetDatas);

                        //搜索功能
                        $scope.searchGridData = function(event){
                    		//搜索客源
                    		$http.post(window.location.origin+'/employee-manage/admin/querycustomer',$scope.customerSearch,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).
                    		success(function(data){
                    			if(data.returnState == "success"){
                    				 $scope.dataStoreForCustomer = dataStoreForCustomer = data.returnData.item;
                                     $scope.formDataResultForCustomer = data.returnData.item;
                                     $scope.paginationConfForCustomer.currentPage = data.returnData.currentPage;
                                     $scope.paginationConfForCustomer.totalItems = data.returnData.totalItems;
                                     $scope.paginationConfForCustomer.itemsPerPage = data.returnData.itemsPerPage;
                    			}else{
                    				$scope.ajaxMsg ="Query customer Data Error!";
                    				$scope.dataStoreForCustomer = dataStoreForCustomer = {};
                                    $scope.formDataResultForCustomer = {};
                    			}
                    		}).
                    		error(function(data){
                    			console.log(000);
                    		});
                        };
                        
                    }
                },
                'footer@customer':{
                    templateUrl:'jsp/view/customerView/footer.html'
                }
            }
        })
        .state('customer.customer', {
            url: '/customer',
            views: {
                'main@customer': {
                    templateUrl: 'jsp/view/customerView/customerManage/customer.html',
                }
            }
        })
        .state('customer.customer.addCustomer',{
          url:'/addCustomer',
          templateUrl:'jsp/view/customerView/customerManage/addCustomerform.html',
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
           		ispublic:"",
           		deadline:"24",
           		customerType:"",
           		carTypeId:"",
           		sex:"",
           		configuration:''
              };

//        	  车型
        	  $http.get(window.location.origin+'/employee-manage/admin/getcartype').success(function(data){
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
        				  $scope.customerObjects = {};
        			  }else{
        				  console.log("Save Faild!");
        			  }
        		  }).error(function(data){
        			  console.log("Ajax posting Faild!");
        		  });
        	  }
           
          }
        })
        .state('customer.customer.sourcedata', {
            url: '/sourcedata',
            views: {
                'main@customer': {
                    templateUrl:'jsp/view/customerView/sourceDataManage/customerDataImport.html',
                    controller: function($scope,$state,$http){
                   	 var showMsg = function(event){
                   		 event.target.setAttribute('data-toggle','modal');
                         event.target.setAttribute('data-target','#myMsgModal');
                   	 }
               	
               	//车源文件上传
                   	$scope.upLoadCustomerSourceExcelFile = function(event){
                   		if(event.target.parentNode.childNodes[1].files.length !=0){
                   			var inputFile = event.target.parentNode.childNodes[1].files[0];
                   			var formData = new FormData();
                			formData.append("file",inputFile);
                       		if(!(inputFile.name.indexOf(".xls")!=-1)){
                       			$scope.SuccessMsgShow = false;
                                $scope.returnErrorMsg = 'File formatter is  not Support.(.xls)';
                       			showMsg(event);
                       		}else if(inputFile.size>=4194304){//文件不超过4M
                       			$scope.SuccessMsgShow = false;
                            	$scope.returnErrorMsg = 'File bigger than 4M is not Support.';
                            	showMsg(event);
                       		}else{
//                       			提交文件
                       			$http.post('',formData,
                            	{
                    	            transformRequest: angular.identity,
                    	            headers: {'Content-Type': undefined}
                    	        }).success(function(data){
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
});