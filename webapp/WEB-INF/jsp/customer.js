var routercustomerApp = angular.module('routercustomerApp', ['ui.router','ui.bootstrap']);
routercustomerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/customer');
    $stateProvider
        .state('customer', {
            url: '/customer',
            views: {
                '': {
                    templateUrl: 'jsp/view/customerView/index.html',
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
                'topbar@customer': {
                    templateUrl: 'jsp/view/customerView/topbar.html',
                    controller: function($scope, $state,$http) {
                    	$http.get(window.location.origin+"/employee-manage/user/getusername").success(function(data){
                    		$scope.uerName = data;
                    	});
                    	$scope.oldPassWord ="";
                    	$scope.newPassWord ="";
                    	$scope.newPassWordAgain ="";
                    	
                    	var samePSW = function(){
                			if($scope.newPassWordAgain != $scope.newPassWord){
                				$scope.newPassAgainMsg = "确认密码必须和新密码一致";
                			}
                		};
                    	
                    	var notNullandSame = function(){
                    		if($scope.oldPassWord ==""){
                    			$scope.oldPassMsg = true;
                    			return false;
                    		}else if($scope.newPassWord ==""){
                    			$scope.newPassMsg = true;
                    			return false;
                    		}else if($scope.newPassWordAgain ==""){
                    			$scope.newPassAgainMsgNotnull = true;
                    			return false;
                    		}else if($scope.newPassWordAgain != $scope.newPassWord){
                    			$scope.newPassAgainMsg = true;
                    			return false;
                    		}
                    		return true;
                    	};
                    	
                    	//修改密码方法
                    	$scope.changPassWord = function(event){
                    		if(notNullandSame()){
                    			$scope.oldPassMsg =$scope.newPassMsg =$scope.newPassAgainMsgNotnull =$scope.newPassAgainMsg = false;
                    			$http.post(window.location.origin+"/employee-manage/user/modifypwd",{
                    				oldPwd:$scope.oldPassWord,
                    				pwd:$scope.newPassWord,
                    				againPwd:$scope.newPassWordAgain
                    			}).
                        		success(function(data){
                        			if(data.returnState = "success"){
                        				$scope.oldPassWord ="";
                                    	$scope.newPassWord ="";
                                    	$scope.newPassWordAgain ="";
                                    	$scope.changePSWSuccess = true;
                                    	setTimeout($scope.changePSWSuccess =false,2000);
                                    	alert("修改成功");
                        			}else{
                        				alert("修改失败");
                        			}
                        		}).
                        		error(function(data){
                        			
                        		});
                    		};
                    		
                    	};
                    }
                },
                'main@customer': {
                    templateUrl: 'jsp/view/customerView/home.html',
                    controller: function($scope, $state,$http) {
                       $scope.ReturnMsg = false;
                        $scope.CarShow = false;
                        $scope.searchFlag = false;
//                        切换车源还是客源
                        $scope.changeDataType = function(event){
                        	$scope.CarShow = !($scope.CarShow);
                        	 $scope.searchFlag = false;
                        };
//                        初始化车源搜索
                        $scope.carSourceSearch = {
                        		'region':'',
                        		'configuration':'',
                        		'carColor':'',
                        		'cartype':'',
                                'currentPage':1,
                                'itemsPerPage': 10,
                        };
                        $scope.customerSearch = {
                        		'name':'',
                        		'level':'',
                        		'ispublic':'',
                        		'currentPage':1,
                                'itemsPerPage': 10,
                        };
                        $http.get(window.location.origin+'/employee-manage/user/getcartype').success(function(data){
                            $scope.editTypeOptionsForCar = data;
                         });
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
                        	
                        	 $http.post(window.location.origin+"/employee-manage/admin/createcar",postData).success(function(data){
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
                            	 $http.get(window.location.origin+'/employee-manage/admin/delcar',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:{id:$scope.delItemId}}).success(function(data){
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
	                          getCarRemarks(dataStore[index].id);
	                          event.target.setAttribute('data-toggle','modal');
	                          event.target.setAttribute('data-target','#myDetailModal');
                         };
                         
                        
                         
//                         客源的数据缓存和pageBar设置
                         var dataStoreForCustomer;
                         var dataEditItemForCustomer;
                         $scope.paginationConfForCustomer = {
                         		   	currentPage:1,
                                    itemsPerPage: 10,
                                    totalItems:30
                                };
                          $scope.maxSize = 5;
                          //获取客源回访内容的数据
                          var getCoustomerRemarks = function(id){
                        	  var postData = {
                        			'customerid':id  
                        	  }
                        	  $http.get(window.location.origin+'/employee-manage/user/getcustomerremarks',{params:postData}).
                        	  success(function(data){
                        		  if(data.returnState = "success"){
                        			  $scope.coumosterRemarkItems = data.returnData.item;
                        		  }
                        	  }).
                        	  error(function(data){
                        		  console.log('Get coustomer remarks error!');
                        	  });
                          };
                        //获取车源回访内容的数据
                          var getCarRemarks = function(id){
                        	  var postData = {
                        			'carid':id  
                        	  }
                        	  $http.get(window.location.origin+'/employee-manage/user/getcarremarks',{params:postData}).
                        	  success(function(data){
                        		  if(data.returnState = "success"){
                        			  $scope.carRemarkItems = data.returnData.item;
                        		  }
                        	  }).
                        	  error(function(data){
                        		  console.log('Get car remarks error!');
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
                         //车源新增回访记录
                         $scope.addCarReMarksRow = function(event){
                        	 $scope.addCarReMarks = !$scope.addCarReMarks;
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
                        	 $http.post(window.location.origin+'/employee-manage/user/addcustomerremark',postData).success(function(data){
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

                         //新增车源回访记录
                         $scope.addCarRemarks = function(event){
                        	 var postData = {
                        			 'content':$scope.addCarReMarksObj.content,
                        			 'carId':$scope.carSourceDetail.id,
                        			 'type':$scope.addCarReMarksObj.type
                        	 };
                        	 var showMsg = function(event){
                           		 event.target.setAttribute('data-toggle','modal');
                                 event.target.setAttribute('data-target','#myMsgModal');
                           	 };
                        	 $http.post(window.location.origin+'/employee-manage/user/addcarremark',postData).success(function(data){
                        		if(data == 'success'){
                        			//提示成功信息
                        			$scope.SuccessMsgShow = true;
                                 	$scope.returnSuccessMsg = 'add ReMarks Success!';
                                 	showMsg(event);
                                 	$scope.addCarReMarks = !$scope.addCarReMarks;
                                 	$scope.addCarReMarksObj = {};
                                 	getCarRemarks($scope.carSourceDetail.id);
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
                          //客源编辑弹窗
                          $scope.editCoustomerItem = function(index,event){
                        	  console.log(dataStoreForCustomer[index]);
                              event.target.setAttribute('data-toggle','modal');
                              event.target.setAttribute('data-target','#myeditCoustomerModal');
                              $scope.editCustomerObject = dataStore[index];
                            };
                            var getDatas = function(){
                              	 if($scope.searchFlag){
                              		 $scope.searchGridData();
                              	 }else{
                              		 reGetDatas();
                              	 }
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
                            	 $http.post(window.location.origin+'/employee-manage/customer/getcar',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                            		 $scope.ajaxMsg ="成功获取车源数据";
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
                            	 $http.post(window.location.origin+'/employee-manage/customer/getcustomer',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                                     if(data.returnState == "success"){
                                    	 $scope.ajaxMsg ="成功获取客源数据";
                                    	 $scope.dataStoreForCustomer = dataStoreForCustomer = data.returnData.item;
                                         $scope.formDataResultForCustomer = data.returnData.item;
                                         $scope.paginationConfForCustomer.currentPage = data.returnData.currentPage;
                                         $scope.paginationConfForCustomer.totalItems = data.returnData.totalItems;
                                         $scope.paginationConfForCustomer.itemsPerPage = data.returnData.itemsPerPage;
                                     }else{
                                    	 $scope.ajaxMsg = "获取数据错误";
                                    }
                            		 
                                  });
                            }

                           
                        };
                        
//                        搜索方法
                       /* $scope.searchGridData = function(event){
                        	if($scope.CarShow){
                        		var postData = $scope.carSourceSearch;
                        		$http.post(window.location.origin+'/employee-manage/customer/querycar',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                        			console.log("SearchSuccess!");
                                 }).error(function(data){
                                	 console.log("Faild!");
                                 });
                        	}else{
                        		var postData = $scope.customerSearch;
                        		$http.post(window.location.origin+'/employee-manage/customer/querycustomer',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                        			console.log("SearchSuccess!");
                                 }).error(function(data){
                                	 console.log("Faild!");
                                 });
                        	}
                        };*/
                        
                        
                        //监听当前页面和每页条数来获取grid数据
                        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage + CarShow +paginationConfForCustomer.currentPage + paginationConfForCustomer.itemsPerPage', getDatas);
                        
                        
                        
                        //搜索功能
                        $scope.searchGridData = function(event){
                        	if($scope.CarShow){
                        		//搜索车源
                        		$scope.carSourceSearch.currentPage = $scope.paginationConf.currentPage;
                            	$scope.carSourceSearch.itemsPerPage = $scope.paginationConf.itemsPerPage;
                        		$http.post(window.location.origin+'/employee-manage/customer/querycar',$scope.carSourceSearch,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).
                        		success(function(data){
                        			if(data.returnState == "success"){
                        				$scope.searchFlag = true;
                        				$scope.dataStore = dataStore = data.returnData.item;
                                        $scope.formDataResult = data.returnData.item;
                                        $scope.paginationConf.currentPage = data.returnData.currentPage;
                                        $scope.paginationConf.totalItems = data.returnData.totalItems;
                                        $scope.paginationConf.itemsPerPage = data.returnData.itemsPerPage;
                        			}else{
                        				$scope.ajaxMsg ="Query carSource Data Error!";
                        				$scope.dataStore = dataStore = {};
                                        $scope.formDataResult = {};
                        			}
                        		}).
                        		error(function(data){
                        			console.log(000);
                        		});
                        	}else{
                        		//搜索客源
                        		$scope.customerSearch.currentPage = $scope.paginationConfForCustomer.currentPage;
                            	$scope.customerSearch.itemsPerPage = $scope.paginationConfForCustomer.itemsPerPage;
                        		$http.post(window.location.origin+'/employee-manage/customer/querycustomer',$scope.customerSearch,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).
                        		success(function(data){
                        			if(data.returnState == "success"){
                        				$scope.searchFlag = true;
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
                        	}
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
                      region:"东区",
                      city:"",
                      company:"",
                      budgetRange:"",
                      carColor:"",
                      decoration:"",
                      installment:"1",
                      insurance:"1",
                      level:"",
                      ispublic:"1",
                      deadline:"24",
                      customerType:"渠道客户",
                      carTypeId:"",
                      sex:"男",
                      configuration:'标准',
                      isTop:"1"
                    };
        	  $scope.cityShow = true;
//        	  车型
        	  $http.get(window.location.origin+'/employee-manage/user/getcartype').success(function(data){
                  $scope.TypeOptions = data;
               });
        	  
        	  
//        	  预算区间
        	  $scope.budgetRangeOptions = ["5万-10万","10万-15万","15万-20万","20万-30万","30万-40万","40万-60万","60万-80万","80万-100万"];
        	  $scope.customerObjects.budgetRange = $scope.budgetRangeOptions[0];
           
//        	  等级
        	  $scope.levelOptions = ["1","2","3","4"];
        	  $scope.customerObjects.level = $scope.levelOptions[0];
//        	  新增客源
        	  $scope.addCustomer = function(){
        		 
        		  var postData = $scope.customerObjects;
        		  $http.post(window.location.origin+"/employee-manage/customer/createcustomer",postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
        			  if(data == "success"){
                    	  $scope.returnSuccessMsg = "新增客源成功";
                    	  $scope.SuccessMsgShow = true;
                    	  $('#myMsgModal').modal('show');
                          console.log("新增客源成功");
                      }else{
                    	  $scope.returnErrorMsg = "新增客源失败";
                    	  $scope.SuccessMsgShow = false;
                    	  $('#myMsgModal').modal('show');
                          console.log("新增客源失败");
                      }
        		  }).error(function(data){
        			  $scope.returnErrorMsg = "新增客源失败";
        			  $scope.SuccessMsgShow = false;
                	  $('#myMsgModal').modal('show');
        		  });
        	  };
        	  
        	  $scope.changeCustomerType = function(index){
            	  if(index == 0){
            		  $scope.cityShow = false;
            		  $scope.customerObjects.city = "";
            	  }else{
            		  $scope.cityShow = true;
            	  }
              };
           
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
                       		 $http.post(window.location.origin+'/employee-manage/customer/customerupload',formData,
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
        .state('customer.carmanage', {
            url: '/carmanage',
            views: {
                'main@customer': {
                    templateUrl:'jsp/view/customerView/carManage/carManage.html'
                }
            }
        })
        .state('customer.carmanage.addCarSource', {
            url: '/addCarSource',
            templateUrl: 'jsp/view/customerView/carManage/carSourceManage/addCarSourceform.html',
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
                  
                  
//                  车型
            	  $http.get(window.location.origin+'/employee-manage/user/getcartype').success(function(data){
                      $scope.TypeOptions = data;
                   });

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
                	  //时间formatter
                	  Date.prototype.format = function (format) {  
                		    /*  
                		     * eg:format="YYYY-MM-dd hh:mm:ss";  
                		     */   
                		    var  o = {  
                		        "M+"  : this .getMonth() + 1,  // month   
                		        "d+"  : this .getDate(),  // day   
                		        "h+"  : this .getHours(),  // hour   
                		        "m+"  : this .getMinutes(),  // minute   
                		        "s+"  : this .getSeconds(),  // second   
                		        "q+"  :Math.floor(( this .getMonth() + 3) / 3),  // quarter   
                		        "S"  : this .getMilliseconds()  
                		    // millisecond   
                		    }  
                		  
                		    if  (/(y+)/.test(format)) {  
                		        format = format.replace(RegExp.$1, (this .getFullYear() +  "" )  
                		                .substr(4 - RegExp.$1.length));  
                		    }  
                		  
                		    for  (  var  k  in  o) {  
                		        if  ( new  RegExp( "("  + k +  ")" ).test(format)) {  
                		            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]  
                		                    : ("00"  + o[k]).substr(( ""  + o[k]).length));  
                		        }  
                		    }  
                		    return  format;  
                		};
                	  $scope.addCarObject.productDate = $scope.dt.format( "yyyy-MM-dd" );
                	  var postData = $scope.addCarObject;
                	  
                	  $http.post(window.location.origin+"/employee-manage/customer/createcar",postData).success(function(data){
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
        .state('customer.carmanage.addCarType', {
            url: '/addCarType',
            templateUrl: 'jsp/view/customerView/carManage/carTypeManage/addCarTypeform.html',
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
                    	$http.post(window.location.origin+"/employee-manage/customer/createcartype",postData).success(function(data){
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
                	
                    $http.get(window.location.origin+'/employee-manage/user/getcartype').success(function(data){
                    $scope.dataStore = dataStore = data;
                    $scope.carTypeResult = data;
                 });
                };
                //获取车型数据
                reGetCarTypeDatas();
             
            }
        })
        .state('customer.carmanage.sourcedata', {
            url: '/sourcedata',
            views: {
                'main@customer': {
                    templateUrl:'jsp/view/customerView/sourceDataManage/carSourceDataImport.html',
                    controller: function($scope,$state,$http){
	                    	 var showMsg = function(event){
	                    		 event.target.setAttribute('data-toggle','modal');
	                          	 event.target.setAttribute('data-target','#myMsgModal');
	                    	 }
                    	
                    	//车源文件上传
                        	$scope.upLoadCarSourceExcelFile = function(event){
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
//                            			提交文件
                            			$http.post(window.location.origin+'/employee-manage/custumer/carupload',formData,
                            			{
                            	            transformRequest: angular.identity,
                            	            headers: {'Content-Type': undefined}
                            	        }).success(function(data){
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
        .state('customer.settings', {
            url: '/settings',
            views: {
                'main@customer': {
                    templateUrl:'jsp/view/customerView/testPage/testPage.html',
                    controller:function($scope,$state,$http){
                    	//上传用户excel文件
                    	$scope.upLoadUserExcelFile = function(event){
                    		 var showMsg = function(event){
	                    		 event.target.setAttribute('data-toggle','modal');
	                          	 event.target.setAttribute('data-target','#myMsgModal');
	                    	 }
                    		 
                       		if(event.target.parentNode.childNodes[1].files.length !=0){
                       			var inputFile = event.target.parentNode.childNodes[1].files[0];
                       			var formData = new FormData();
                    			formData.append("file",inputFile);
                           		if(!(inputFile.name.indexOf(".xls")!=-1)){
                           			$scope.SuccessMsgShow = false;
                                    $scope.returnErrorMsg = 'File formatter is not Support.';
                           			showMsg(event);
                           		}else if(inputFile.size>=4194304){//文件不超过4M
                           			$scope.SuccessMsgShow = false;
                                    	$scope.returnErrorMsg = 'File bigger than 4M is not Support.';
                                    	showMsg(event);
                           		}else{
//                           			提交文件
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
        .state('customer.reportform', {
            url: '/reportform',
            views: {
                'main@customer': {
                    templateUrl:'jsp/view/customerView/reportFormManage/reportForm.html',
                    controller: function($scope,$state,$http){
                  	  
                  	  
//                  pageBar组件
                  	$scope.paginationConf = {
                 		   currentPage:1,
                            itemsPerPage: 10,
                            totalItems:10
                        };
                  $scope.maxSize = 5;

                  $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                  };
                  	  
                  	//日期组件
                      $scope.today = function() {
                            $scope.dt = new Date();
                            $scope.dt1 = new Date();
                      };
                      $scope.today();

                      $scope.clear = function () {
                        $scope.dt = null;
                        $scope.dt1 = null;
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
                      
                      $scope.searchReport = function(){
                    	  getRePort();
                      };
                      
                      //时间formatter
                	  Date.prototype.format = function (format) {  
                		    /*  
                		     * eg:format="YYYY-MM-dd hh:mm:ss";  
                		     */   
                		    var  o = {  
                		        "M+"  : this .getMonth() + 1,  // month   
                		        "d+"  : this .getDate(),  // day   
                		        "h+"  : this .getHours(),  // hour   
                		        "m+"  : this .getMinutes(),  // minute   
                		        "s+"  : this .getSeconds(),  // second   
                		        "q+"  :Math.floor(( this .getMonth() + 3) / 3),  // quarter   
                		        "S"  : this .getMilliseconds()  
                		    // millisecond   
                		    }  
                		  
                		    if  (/(y+)/.test(format)) {  
                		        format = format.replace(RegExp.$1, (this .getFullYear() +  "" )  
                		                .substr(4 - RegExp.$1.length));  
                		    }  
                		  
                		    for  (  var  k  in  o) {  
                		        if  ( new  RegExp( "("  + k +  ")" ).test(format)) {  
                		            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]  
                		                    : ("00"  + o[k]).substr(( ""  + o[k]).length));  
                		        }  
                		    }  
                		    return  format;  
                		};
                		$scope.report={
                				startTime:'',
                				endTime:'',
                				currentPage:'',
                				itemsPerPage:''
                		};
                	  $scope.report.startTime = $scope.dt.format( "yyyy-MM-dd" );
                	  $scope.report.endTime = $scope.dt1.format( "yyyy-MM-dd" );
                	  $scope.report.currentPage=$scope.paginationConf.currentPage;
                  	  $scope.report.itemsPerPage=$scope.paginationConf.itemsPerPage;
                      
                  	  var getRePort = function(){
                  		 $http.post(window.location.origin+'/employee-manage/admin/getreport',$scope.report).
		                   	  success(function(data){
		                         if(data.returnState == "success"){
		                       	  $scope.formDataResult = data.returnData.item;
		                         }else{
		                         	
		                         }
		                       }).
		                       error(function(data){
		                       	
		                       });
                  	  	};
                  	  getRePort();
                  	  $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getRePort);
                  	  	
                    }
                    }
                }
           
        })
});

routercustomerApp.filter('publicOrNot',function(){
    return function(field){
       if(field == "1"){
    	   return "公客";
       }else{
           return "私客";
       }
    };
});

routercustomerApp.filter('topOrNot',function(){
    return function(field){
       if(field == "1"){
    	   return "置顶";
       }else{
           return "不置顶";
       }
    };
});

routercustomerApp.filter('isOrNo',function(){
    return function(field){
       if(field == "1"){
    	   return "是";
       }else{
           return "否";
       }
    };
});

routercustomerApp.filter('customerType',function(){
    return function(field){
       if(field == "1"){
    	   return "直接客户";
       }else{
           return "渠道客户";
       }
    };
});

routercustomerApp.filter('importColor',function(){
    return function(field){
       if(field == "1"){
    	   return "#FF3333";
       }
    }
});
routercustomerApp.filter('isChannel',function(){
    return function(field){
       if(field == "1"){
    	   return "渠道商";
       }else{
    	   return "普通";
       }
       
    }
});
//isTo, isChannal
routercustomerApp.filter('table_style',function(){
	return function(field1,field2){
       if(field1 == "1" && field2 == "1")
    	   return "istop-channel";
       else if(field1 == "1" && field2 == "0"){
    	   return "istop-normal";
       }
       else if(field1 == "0" && field2 == "1")
    	   return "normal-channel";
       else{
    	   return "normal-normal";
       }
    };
});
routercustomerApp.filter('customerTableStyle',function(){
	return function(field){
	       if(field == "1")
	    	   return "customerIsTop";
	       else{
	    	   return "customerNormal";
	       }
	    };
	});
