var routerSupplyApp = angular.module('routerSupplyApp', ['ui.router','ui.bootstrap']);
routerSupplyApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/supply');
    $stateProvider
        .state('supply', {
            url: '/supply',
            views: {
                '': {
                    templateUrl: 'jsp/view/carView/index.html',
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
                'topbar@supply': {
                    templateUrl: 'jsp/view/carView/topbar.html',
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
                'main@supply': {
                    templateUrl: 'jsp/view/carView/home.html',
                    controller: function($scope, $state,$http) {
                       $scope.ReturnMsg = false;
                        $scope.CarShow = true;
                        $scope.searchFlag = false;
//                        切换车源还是客源
                        $scope.changeDataType = function(event){
                        	$scope.CarShow = !($scope.CarShow);
                        	$scope.searchFlag = false;
                        };
//                       初始化车源搜索
                        $scope.carSourceSearch = {
                                'region':'',
                                'configuration':'',
                                'carColor':'',
                                'carTypeRecord':'',
                                'currentPage':1,
                                'itemsPerPage': 10,
                        };
                        $scope.customerSearch = {
                                'carTypeRecord':'',
                                'carColor':'',
                                'carDecoration':'',
                                'configuration':'',
                                'currentPage':1,
                                'itemsPerPage': 10,
                                
                        }
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
                        	
                        	 $http.post(window.location.origin+"/employee-manage/supply/createcar",postData).success(function(data){
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
                                 	$scope.returnSuccessMsg = '添加成功';
                                 	showMsg(event);
                                 	$scope.addReMarks = !$scope.addReMarks;
                                 	$scope.addreMarksObj = {};
                                 	getCoustomerRemarks($scope.coustomerSourceDetail.id);
                                 	GetDatas();
                        		}else{
                        			$scope.SuccessMsgShow = false;
                                  	$scope.returnErrorMsg = '添加失败';
                                  	showMsg(event);
                        		}
                        	 }).error(function(data){
                        		$scope.SuccessMsgShow = false;
                              	$scope.returnErrorMsg = '添加失败';
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
                                 	$scope.returnSuccessMsg = '添加成功';
                                 	showMsg(event);
                                 	$scope.addCarReMarks = !$scope.addCarReMarks;
                                 	$scope.addCarReMarksObj = {};
                                 	getCarRemarks($scope.carSourceDetail.id);
                                 	getDatas();
                        		}else{
                        			$scope.SuccessMsgShow = false;
                                  	$scope.returnErrorMsg = '添加失败';
                                  	showMsg(event);
                        		}
                        	 }).error(function(data){
                        		$scope.SuccessMsgShow = false;
                              	$scope.returnErrorMsg = '添加失败';
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
                            
//                       客源删除
                         $scope.delCoustomerItem = function(index,event){
                        	 $scope.delItemName = dataStoreForCustomer[index].name;
                             event.target.setAttribute('data-toggle','modal');
                             event.target.setAttribute('data-target','#myDelModal');
                         };
                         //
                         var getDatas = function(){
                        	 if($scope.searchFlag){
                        		 $scope.searchGridData();
                        	 }else{
                        		 reGetDatas();
                        	 }
                         };
                         
                        //获取Grid数据方法
                        var reGetDatas = function(){
                           
//                            请求车源还是客源的URL
                            if($scope.CarShow){
                            	 var postData = {
                                         currentPage: $scope.paginationConf.currentPage,
                                         itemsPerPage: $scope.paginationConf.itemsPerPage
                                     };
                            	 $http.post(window.location.origin+'/employee-manage/supply/getcar',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                            		 $scope.ajaxMsg ="成功获取数据!";
                            		 $scope.dataStore = dataStore = data.returnData.item;
                                     $scope.formDataResultForSupply = data.returnData.item;
                                     $scope.paginationConf.currentPage = data.returnData.currentPage;
                                     $scope.paginationConf.totalItems = data.returnData.totalItems;
                                     $scope.paginationConf.itemsPerPage = data.returnData.itemsPerPage;
                                  });
                            }else{
                            	 var postData = {
                                         currentPage: $scope.paginationConfForCustomer.currentPage,
                                         itemsPerPage: $scope.paginationConfForCustomer.itemsPerPage
                                     };
                            	 $http.post(window.location.origin+'/employee-manage/supply/getcustomer',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                                     if(data.returnState == "success"){
                                    	 $scope.ajaxMsg ="成功获取数据!";
                                    	 $scope.dataStoreForCustomer = dataStoreForCustomer = data.returnData.item;
                                         $scope.formDataResultForSupplyForCustomer = data.returnData.item;
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
                       /* $scope.searchGridData = function(event){
                        	if($scope.CarShow){
                        		var postData = $scope.carSourceSearch;
                        		$http.get(window.location.origin+'/employee-manage/admin/getcar',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
                        			console.log("SearchSuccess!");
                                 }).error(function(data){
                                	 console.log("Faild!");
                                 });
                        	}else{
                        		var postData = $scope.customerSearch;
                        		$http.get(window.location.origin+'/employee-manage/admin/getcustomer',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
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
                        		$http.post(window.location.origin+'/employee-manage/supply/querycar',$scope.carSourceSearch,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).
                        		success(function(data){
                        			if(data.returnState == "success"){
                        				$scope.searchFlag = true;
                        				$scope.dataStore = dataStore = data.returnData.item;
                                        $scope.formDataResultForSupply = data.returnData.item;
                                        $scope.paginationConf.currentPage = data.returnData.currentPage;
                                        $scope.paginationConf.totalItems = data.returnData.totalItems;
                                        $scope.paginationConf.itemsPerPage = data.returnData.itemsPerPage;
                        			}else{
                        				$scope.ajaxMsg ="Query carSource Data Error!";
                        				$scope.dataStore = dataStore = {};
                                        $scope.formDataResultForSupply = {};
                        			}
                        		}).
                        		error(function(data){
                        			console.log(000);
                        		});
                        	}else{
                        		//搜索客源
                        		$scope.customerSearch.currentPage = $scope.paginationConfForCustomer.currentPage;
                            	$scope.customerSearch.itemsPerPage = $scope.paginationConfForCustomer.itemsPerPage;
                        		$http.post(window.location.origin+'/employee-manage/supply/querycustomer',$scope.customerSearch,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).
                        		success(function(data){
                        			if(data.returnState == "success"){
                        				$scope.searchFlag = true;
                        				 $scope.dataStoreForCustomer = dataStoreForCustomer = data.returnData.item;
                                         $scope.formDataResultForSupplyForCustomer = data.returnData.item;
                                         $scope.paginationConfForCustomer.currentPage = data.returnData.currentPage;
                                         $scope.paginationConfForCustomer.totalItems = data.returnData.totalItems;
                                         $scope.paginationConfForCustomer.itemsPerPage = data.returnData.itemsPerPage;
                        			}else{
                        				$scope.ajaxMsg ="Query customer Data Error!";
                        				$scope.dataStoreForCustomer = dataStoreForCustomer = {};
                                        $scope.formDataResultForSupplyForCustomer = {};
                        			}
                        		}).
                        		error(function(data){
                        			console.log(000);
                        		});
                        	}
                        };
                        
                    }
                },
                'footer@supply':{
                    templateUrl:'jsp/view/carView/footer.html'
                }
            }
        })
        .state('supply.customer', {
            url: '/customer',
            views: {
                'main@supply': {
                    templateUrl: 'jsp/view/carView/customerManage/customer.html',
                }
            }
        })
        .state('supply.customer.addCustomer',{
          url:'/addCustomer',
          templateUrl:'jsp/view/carView/customerManage/addCustomerform.html',
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
        	  $http.get(window.location.origin+'/employee-manage/user/getcartype').success(function(data){
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
        .state('supply.customer.sourcedata', {
            url: '/sourcedata',
            views: {
                'main@supply': {
                    templateUrl:'jsp/view/carView/sourceDataManage/customerDataImport.html',
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
        .state('supply.carmanage', {
            url: '/carmanage',
            views: {
                'main@supply': {
                    templateUrl:'jsp/view/carView/carManage/carManage.html'
                }
            }
        })
        .state('supply.carmanage.carchannel.sourcedata', {
            url: '/channelsourcedata',
            views: {
                'main@supply': {
                    templateUrl:'jsp/view/carView/sourceDataManage/channelSourceDataImport.html',
                    controller: function($scope,$state,$http){
                    		$scope.uploadIsDisable = false;
                             var showMsg = function(event){
                            	 
                                 event.target.setAttribute('data-toggle','modal');
                                 event.target.setAttribute('data-target','#myMsgModal');
                             };
                             
                             $scope.changeBtnState = function(){
                            	 if($scope.uploadIsDisable)
                            		 $scope.uploadIsDisable = false;
                            	 else
                            		 $scope.uploadIsDisable = true;
                            	 return $scope.uploadIsDisable;                                         
                             };
                             
                             
                        //车源文件上传
                            $scope.upLoadCarSourceExcelFile = function(event){             
                            	if(event.target.parentNode.childNodes[1].files.length !=0){
                                    var inputFile = event.target.parentNode.childNodes[1].files[0];
                                    
                                    var formData = new FormData();
                                    formData.append("file",inputFile);
                                    if(!(inputFile.name.indexOf(".xls")!=-1)){
                                        $scope.SuccessMsgShow = false;
                                        $scope.returnErrorMsg = '文件格式 不支持(请上传.xls格式)';
                                        showMsg(event);
                                    }else if(inputFile.size>=4194304){//文件不超过4M
                                        $scope.SuccessMsgShow = false;
                                        $scope.returnErrorMsg = '不支持大于4M的文件上传';
                                        showMsg(event);
                                    }else{
//                                      提交文件
                                        $http.post(window.location.origin+'/employee-manage/supply/channelcarupload',formData,
                                        {
                                            transformRequest: angular.identity,
                                            headers: {'Content-Type': undefined}
                                        }).success(function(data){
                                            $scope.uploadSuccess = true;
                                            $scope.SuccessMsgShow = true;
                                            $scope.returnSuccessMsg = '上传成功';
                                            showMsg(event);
                                            $scope.uploadIsDisable = true;
                                        }).error(function(data){
                                            $scope.uploadFaild = true;
                                            $scope.SuccessMsgShow = false;
                                            $scope.returnErrorMsg = '上传失败';
                                            showMsg(event);
                                            $scope.uploadIsDisable = false;
                                        });
                                    }
                                }else{
                                    $scope.SuccessMsgShow = false;
                                    $scope.returnErrorMsg = '请选择上传文件';
                                    showMsg(event);
                                }
                                
                            };
                        }
                }
            }
        })
        .state('supply.carmanage.carchannel',{
        	url:'/carchannel',
        	templateUrl:'jsp/view/carView/carManage/carSourceManage/carChannelManage.html',
        	controller: function($scope, $state,$http){
        		
        		$scope.backToPrevious = function() {
                    window.history.back();
                };
        		
        		$scope.addCarObject = {
                        isTop:"",
                        city:"",
                        shopName:"",
                        customerManager:"",
                        customerManagerTel:"",
                        wechat:"",
                        saleManager:"",
                        saleManagerTel:"",
                        carTypeId:"",
                        region:"",
                        principal:""
                      };
        				//车型
		        		$http.get(window.location.origin+'/employee-manage/user/getcartype').success(function(data){
		                    $scope.TypeOptions = data;
		                    $scope.addCarObject.carTypeId = $scope.TypeOptions[0].id;
		                 });
                      //初始化各个select组件
		        	//区域
                      $scope.areaOptions=['东区','南区','西区','北区'];
                      $scope.addCarObject.region=$scope.areaOptions[0];
                      // 类型
                      $scope.typeOptions =['进口店','国产店'];
                      $scope.addCarObject.type=$scope.typeOptions[0];
                      
                      $scope.addCarObject.isTop = "0";
                      
                      $scope.saveCarSource = function(){
                    	  
                          var postData = $scope.addCarObject;
                    	  
                    	  $http.post(window.location.origin+"/employee-manage/supply/createchannelcar",postData).success(function(data){
                              if(data == "success"){
                                  console.log(data);
                                  $scope.returnSuccessMsg = "新增渠道商车源成功";
                                  $scope.SuccessMsgShow = true;
                            	  $('#myMsgModal').modal('show');
                              }else{
                              	 $scope.returnErrorMsg = "新增车源失败";
                              	  $scope.SuccessMsgShow = false;
                              	  $('#myMsgModal').modal('show');
                              }
                          });
                      }
                      
        	}
        })
        .state('supply.carmanage.addCarSource', {
            url: '/addCarSource',
            templateUrl: 'jsp/view/carView/carManage/carSourceManage/addCarSourceform.html',
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
                  	isTop:"0",
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
                  $scope.areaOptions=['东区','南区','西区','北区'];
                  $scope.addCarObject.region=$scope.areaOptions[0];
//                  类型
                  $scope.typeOptions =['进口','国产'];
                  $scope.addCarObject.type=$scope.typeOptions[0];
//                  可售区域
                  $scope.saleRegionOptions=['全国','省内','小区域'];
                  $scope.addCarObject.saleRegion=$scope.saleRegionOptions[0];
                  $scope.addCarObject.isTop = "0";
                  
                  
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
                	  
                	  $http.post(window.location.origin+"/employee-manage/supply/createcar",postData).success(function(data){
                  		if(data == "success"){
                  			if(data == "success"){
                                console.log(data);
                                $scope.returnSuccessMsg = "新增客源成功";
                                $scope.SuccessMsgShow = true;
                          	  $('#myMsgModal').modal('show');
                            }else{
                            	 $scope.returnErrorMsg = "新增车源失败";
                            	  $scope.SuccessMsgShow = false;
                            	  $('#myMsgModal').modal('show');
                                console.log("新增车源失败");
                            }
                  		}else{
                  			 $scope.returnErrorMsg = "新增车源失败";
                  			  $scope.SuccessMsgShow = false;
                        	  $('#myMsgModal').modal('show');
                            console.log("新增车源失败");
                  		}
                  	});
                  };
            
            }
        })
        .state('supply.carmanage.addCarType', {
            url: '/addCarType',
            templateUrl: 'jsp/view/carView/carManage/carTypeManage/addCarTypeform.html',
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
                    	$http.post(window.location.origin+"/employee-manage/supply/createcartype",postData).success(function(data){
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
        .state('supply.carmanage.sourcedata', {
            url: '/sourcedata',
            views: {
                'main@supply': {
                    templateUrl:'jsp/view/carView/sourceDataManage/carSourceDataImport.html',
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
                            			$http.post(window.location.origin+'/employee-manage/supply/carupload',formData,
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
        });
});

routerSupplyApp.filter('publicOrNot',function(){
    return function(field){
       if(field == "1"){
    	   return "公客";
       }else{
           return "私客";
       }
    };
});

routerSupplyApp.filter('topOrNot',function(){
    return function(field){
       if(field == "1"){
    	   return "置顶";
       }else{
           return "不置顶";
       }
    };
});

routerSupplyApp.filter('customerType',function(){
    return function(field){
       if(field == "1"){
    	   return "直接客户";
       }else{
           return "渠道客户";
       }
    };
});

routerSupplyApp.filter('importColor',function(){
    return function(field){
       if(field == "1"){
    	   return "#FF3333";
       }
    };
});
routerSupplyApp.filter('isChannel',function(){
    return function(field){
       if(field == "1"){
    	   return "渠道商";
       }else{
    	   return "普通";
       }
       
    };
});
//isTo, isChannal
routerSupplyApp.filter('table_style',function(){
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
routerSupplyApp.filter('customerTableStyle',function(){
	return function(field){
	       if(field == "1")
	    	   return "customerIsTop";
	       else{
	    	   return "customerNormal";
	       }
	    };
	});