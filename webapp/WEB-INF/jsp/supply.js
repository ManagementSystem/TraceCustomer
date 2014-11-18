var routerSupplyApp = angular.module('routerSupplyApp', ['ui.router','ui.bootstrap']);
routerSupplyApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/supply');
    $stateProvider
        .state('supply', {
            url: '/supply',
            views: {
                '': {
                    templateUrl: 'jsp/view/carView/index.html'
                },
                'topbar@supply': {
                    templateUrl: 'jsp/view/carView/topbar.html',
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
                'main@supply': {
                    templateUrl: 'jsp/view/carView/home.html',
                    controller: function($scope, $state,$http) {
                       $scope.ReturnMsg = false;
                        
//                         客源的数据缓存和pageBar设置
                         var dataStoreForSupply;
                         var dataEditItemForSupply;
                         $scope.paginationConfForSupply = {
                         		   	currentPage:1,
                                    itemsPerPage: 5,
                                    totalItems:30
                                };
                          $scope.maxSize = 5;
                          //获取客源回访内容的数据
                          var getCarRemarks = function(id){
                        	  var postData = {
                        			'supplyid':id  
                        	  }
                        	  $http.get(window.location.origin+'/employee-manage/supply/getremarks',{params:postData}).
                        	  success(function(data){
                        		  if(data.returnState = "success"){
                        			  $scope.coumosterRemarkItems = data.returnData.item;
                        		  }
                        	  }).
                        	  error(function(data){
                        		  console.log('Get supply remarks error!');
                        	  });
                          };
                          
                          //客源详细的弹出窗
                          $scope.detailCarItem = function(index,event){
                        	  $scope.coustomerSourceDetail = dataStoreForCustomer[index];
                        	  getCoustomerRemarks(dataStoreForCustomer[index].id);
	                          event.target.setAttribute('data-toggle','modal');
	                          event.target.setAttribute('data-target','#myCustomerDetailModal');
                          };
                          
                          //客源新增回访记录
                         $scope.addSupplyReMarksRow = function(event){
                        	 $scope.addReMarks = !$scope.addReMarks;
                         };
                       
//                         新增客源回访记录提交
                         $scope.addRemarks = function(event){
                        	 var postData = {
                        			 'content':$scope.addreMarksObj.content,
                        			 'supplyId':$scope.SupplySourceDetail.id,
                        			 'type':$scope.addreMarksObj.type
                        	 };
                        	 var showMsg = function(event){
                           		 event.target.setAttribute('data-toggle','modal');
                                 	 event.target.setAttribute('data-target','#myMsgModal');
                           	 };
                        	 $http.post(window.location.origin+'/employee-manage/supply/addremark',postData).success(function(data){
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
                                 currentPage: $scope.paginationConfForSupply.currentPage,
                                 itemsPerPage: $scope.paginationConfForSupply.itemsPerPage
                             };
                    	 $http.post(window.location.origin+'/employee-manage/supply/getcar',postData).success(function(data){
                             if(data.returnState == "success"){
                            	 $scope.ajaxMsg ="Get supplySource Data Success!";
                            	 $scope.dataStoreForSupply = dataStoreForSupply = data.returnData.item;
                                 $scope.formDataResultForSupply = data.returnData.item;
                                 $scope.paginationConfForSupply.currentPage = data.returnData.currentPage;
                                 $scope.paginationConfForSupply.totalItems = data.returnData.totalItems;
                                 $scope.paginationConfForSupply.itemsPerPage = data.returnData.itemsPerPage;
                             }else{
                            	 $scope.ajaxMsg = "Get SupplySource Data Error!";
                            }
                          });
                           
                        };
                        
//                        搜索方法
                        $scope.searchGridData = function(event){
	                		var postData = $scope.SupplySearch;
	                		$http.get(window.location.origin+'/employee-manage/supply/getsupply',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
	                			console.log("SearchSuccess!");
	                         }).error(function(data){
	                        	 console.log("Faild!");
	                         });
                        };
                        
                        
                        //监听当前页面和每页条数来获取grid数据
                        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage + CarShow +paginationConfForSupply.currentPage + paginationConfForSupply.itemsPerPage', reGetDatas);

                        //搜索功能
                        $scope.searchGridData = function(event){
                    		//搜索客源
                    		$http.post(window.location.origin+'/employee-manage/supply/querysupply',$scope.supplySearch,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).
                    		success(function(data){
                    			if(data.returnState == "success"){
                    				 $scope.dataStoreForSupply = dataStoreForSupply = data.returnData.item;
                                     $scope.formDataResultForSupply = data.returnData.item;
                                     $scope.paginationConfForSupply.currentPage = data.returnData.currentPage;
                                     $scope.paginationConfForSupply.totalItems = data.returnData.totalItems;
                                     $scope.paginationConfForSupply.itemsPerPage = data.returnData.itemsPerPage;
                    			}else{
                    				$scope.ajaxMsg ="Query Supply Data Error!";
                    				$scope.dataStoreForSupply = dataStoreForSupply = {};
                                    $scope.formDataResultForSupply = {};
                    			}
                    		}).
                    		error(function(data){
                    			console.log(000);
                    		});
                        };
                        
                    }
                },
                'footer@supply':{
                    templateUrl:'jsp/view/carView/footer.html'
                }
            }
        })
        .state('supply.supply', {
            url: '/supply',
            views: {
                'main@supply': {
                    templateUrl: 'jsp/view/carView/supplyManage/supply.html',
                }
            }
        })
        .state('supply.supply.addSupply',{
          url:'/addSupply',
          templateUrl:'jsp/view/carView/supplyManage/addSupplyform.html',
          controller:function($scope,$state,$http){
//        	  客户类
              $scope.supplyObjects = {
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
           		supplyType:"",
           		carTypeId:"",
           		sex:"",
           		configuration:''
              };

//        	  车型
        	  $http.get(window.location.origin+'/employee-manage/user/getcartype').success(function(data){
                  $scope.TypeOptions = data;
               });
        	  
        	  
//        	  预算区间
        	  $scope.budgetRangeOptions = ["5万-10万","10万-15万","15万-20万","20万-30万","30万-40万","40万-60万","60万-80万","80万-100万"];
        	  $scope.supplyObjects.budgetRange = $scope.budgetRangeOptions[0];
           
//        	  等级
        	  $scope.levelOptions = ["1","2","3","4"];
        	  $scope.supplyObjects.level = $scope.levelOptions[0];
//        	  新增客源
        	  $scope.addCustomer = function(){
        		 
        		  var postData = $scope.supplyObjects;
        		  $http.post(window.location.origin+"/employee-manage/supply/createsupply",postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
        			  if(data == "success"){
        				  $scope.supplyObjects = {};
        			  }else{
        				  console.log("Save Faild!");
        			  }
        		  }).error(function(data){
        			  console.log("Ajax posting Faild!");
        		  });
        	  };
           
          }
        })
        .state('supply.supply.sourcedata', {
            url: '/sourcedata',
            views: {
                'main@supply': {
                    templateUrl:'jsp/view/supplyView/sourceDataManage/supplyDataImport.html',
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