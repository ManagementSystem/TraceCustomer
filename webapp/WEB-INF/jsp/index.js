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
                    templateUrl: 'jsp/view/adminView/topbar.html',
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
                                    }else{
                                        
                                    }
                                }).
                                error(function(data){
                                    
                                });
                            };
                            
                        };
                    }
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
//                        初始化车源搜索
                        $scope.carSourceSearch = {
                                'region':'',
                                'config':'',
                                'carColor':'',
                                'cartype':''
                        };
                        $scope.customerSearch = {
                                'name':'',
                                'level':'',
                                'ispublic':''
                        }
                        
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
                            
                             $http.post(window.location.origin+"/employee-manage/admin/updatecar",postData).success(function(data){
                                if(data == "success"){
                                    console.log(data);
                                //修改后刷新车源列表
                              reGetDatas();
                                //关闭模态框
                              $('#myEditModal').modal('hide');
//                                   置空修改项
                              $scope.editCarObject = {};
                                    
                                }else{
                                    console.log("修改保存失败");
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
                                        console.log("删除成功");
                                        $scope.SuccessMsgShow = true;
                                        $scope.returnSuccessMsg = '删除成功';
                                        event.target.setAttribute('data-toggle','modal');
                                        event.target.setAttribute('data-target','#myMsgModal');
                                        reGetDatas();
                                        $('#myDelModal').modal('hide');
                                    }else{
                                        console.log("删除失败");
                                        $scope.SuccessMsgShow = false;
                                        $scope.returnErrorMsg = '对不起，发生了错误，删除失败';
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
                            	 //客源删除
                            	 $http.get(window.location.origin+'/employee-manage/admin/delcustomer',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:{id:$scope.delCoustomerId}}).
                            	 	success(function(data){
                            	 		if(data == "success"){
                                            console.log("Del Success!");
                                            $scope.SuccessMsgShow = true;
                                            $scope.returnSuccessMsg = 'Good job,Well done.';
                                            event.target.setAttribute('data-toggle','modal');
                                            event.target.setAttribute('data-target','#myMsgModal');
                                            reGetDatas();
                                            $('#myDelModal').modal('hide');
                                        }else{
                                            console.log("Del Faild");
                                            $scope.SuccessMsgShow = false;
                                            $scope.returnErrorMsg = 'Sorry,Error happend.';
                                            event.target.setAttribute('data-toggle','modal');
                                            event.target.setAttribute('data-target','#myMsgModal');
                                            
                                        }
                            	 	}).
                            	 	error(function(data){
                            	 		console.log("删除客源失败");
                            	 		  $scope.SuccessMsgShow = false;
                                          $scope.returnErrorMsg = 'Sorry,Error happend in Ajax Posting.';
                                          event.target.setAttribute('data-toggle','modal');
                                          event.target.setAttribute('data-target','#myMsgModal');
                            	 	})
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
                        		  console.log('获取客源回访失败');
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
                        		  console.log('获取车源回访失败');
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
                                 	$scope.returnSuccessMsg = '添加客源回访信息成功';
                                 	showMsg(event);
                                 	$scope.addReMarks = !$scope.addReMarks;
                                 	$scope.addreMarksObj = {};
                                 	getCoustomerRemarks($scope.coustomerSourceDetail.id);
                        		}else{
                        			$scope.SuccessMsgShow = false;
                                  	$scope.returnErrorMsg = '添加客源回访信息失败';
                                  	showMsg(event);
                        		}
                        	 }).error(function(data){
                        		$scope.SuccessMsgShow = false;
                              	$scope.returnErrorMsg = '添加客源回访信息失败';
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
                                 	$scope.returnSuccessMsg = '添加车源回访信息成功';
                                 	showMsg(event);
                                 	$scope.addCarReMarks = !$scope.addCarReMarks;
                                 	$scope.addCarReMarksObj = {};
                                 	getCarRemarks($scope.carSourceDetail.id);
                        		}else{
                        			$scope.SuccessMsgShow = false;
                                  	$scope.returnErrorMsg = '添加客源回访信息失败';
                                  	showMsg(event);
                        		}
                        	 }).error(function(data){
                        		$scope.SuccessMsgShow = false;
                              	$scope.returnErrorMsg = '添加客源回访信息失败';
                              	showMsg(event);
                        	 });
                         };
                          //客源编辑弹窗
                          $scope.editCoustomerItem = function(index,event){
                              console.log(dataStoreForCustomer[index]);
                              event.target.setAttribute('data-toggle','modal');
                              event.target.setAttribute('data-target','#myeditCoustomerModal');
                              $scope.editCustomerObject = dataStoreForCustomer[index];
                              
                              //获取车型
                              
                              $http.get(window.location.origin+'/employee-manage/admin/getcartype').success(function(data){
                                  $scope.editTypeOptions = data;
                               });
                            };
                            
                            
                            
                            //客源编辑保存
                            $scope.saveCoustomerModify = function(event){
                            	var postData = $scope.editCustomerObject;
                            	$http.post(window.location.origin+'/employee-manage/admin/updatecustomer',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).
                            		success(function(data){
                            			console.log("客源修改成功");
                            		}).
                            		error(function(data){
                            			console.log("客源修改失败");
                            		});
                            }
                            
//                       客源删除
                         $scope.delCoustomerItem = function(index,event){
                             $scope.delItemName = dataStoreForCustomer[index].name;
                             $scope.delCoustomerId = dataStoreForCustomer[index].id;
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
                                 $http.post(window.location.origin+'/employee-manage/admin/getcar',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                                     $scope.ajaxMsg ="获取车源数据成功！";
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
                                 $http.post(window.location.origin+'/employee-manage/admin/getcustomer',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                                     if(data.returnState == "success"){
                                         $scope.ajaxMsg ="获取客源数据成功！";
                                         $scope.dataStoreForCustomer = dataStoreForCustomer = data.returnData.item;
                                         $scope.formDataResultForCustomer = data.returnData.item;
                                         $scope.paginationConfForCustomer.currentPage = data.returnData.currentPage;
                                         $scope.paginationConfForCustomer.totalItems = data.returnData.totalItems;
                                         $scope.paginationConfForCustomer.itemsPerPage = data.returnData.itemsPerPage;
                                     }else{
                                         $scope.ajaxMsg = "获取客源数据失败";
                                    }
                                     
                                  });
                            }

                           
                        };
                        
//                        搜索方法
                        $scope.searchGridData = function(event){
                            if($scope.CarShow){
                                var postData = $scope.carSourceSearch;
                                $http.get(window.location.origin+'/employee-manage/admin/getcar',{headers:{"Content-Type":"application/json;charset=UTF-8"},params:postData}).success(function(data){
                                    console.log("SearchSuccess!");
                                 }).error(function(data){
                                     console.log("Faild!");
                                 });
                            }else{
                                var postData = $scope.customerSearch;
                                $http.post(window.location.origin+'/employee-manage/admin/getcustomer',postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                                    console.log("SearchSuccess!");
                                 }).error(function(data){
                                     console.log("Faild!");
                                 });
                            }
                        };
                        
                        
                        //监听当前页面和每页条数来获取grid数据
                        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage + CarShow +paginationConfForCustomer.currentPage + paginationConfForCustomer.itemsPerPage', reGetDatas);

                        //搜索功能
                        $scope.searchGridData = function(event){
                            if($scope.CarShow){
                                //搜索车源
                                $http.post(window.location.origin+'/employee-manage/admin/querycar',$scope.carSourceSearch,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).
                                success(function(data){
                                    if(data.returnState == "success"){
                                        $scope.dataStore = dataStore = data.returnData.item;
                                        $scope.formDataResult = data.returnData.item;
                                        $scope.paginationConf.currentPage = data.returnData.currentPage;
                                        $scope.paginationConf.totalItems = data.returnData.totalItems;
                                        $scope.paginationConf.itemsPerPage = data.returnData.itemsPerPage;
                                    }else{
                                        $scope.ajaxMsg ="查询车源信息失败";
                                        $scope.dataStore = dataStore = {};
                                        $scope.formDataResult = {};
                                    }
                                }).
                                error(function(data){
                                    console.log(000);
                                });
                            }else{
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
                                        $scope.ajaxMsg ="查询客源信息失败";
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
//            客户类
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

//            车型
              $http.get(window.location.origin+'/employee-manage/admin/getcartype').success(function(data){
                  $scope.TypeOptions = data;
               });
              
              
//            预算区间
              $scope.budgetRangeOptions = ["5万-10万","10万-15万","15万-20万","20万-30万","30万-40万","40万-60万","60万-80万","80万-100万"];
              $scope.customerObjects.budgetRange = $scope.budgetRangeOptions[0];
           
//            等级
              $scope.levelOptions = ["1","2","3","4"];
              $scope.customerObjects.level = $scope.levelOptions[0];
//            新增客源
              $scope.addCustomer = function(){
                 
                  var postData = $scope.customerObjects;
                  $http.post(window.location.origin+"/employee-manage/admin/createcustomer",postData,{headers:{"Content-Type":"application/json;charset=UTF-8"}}).success(function(data){
                      if(data == "success"){
                          console.log("新增客源成功");
                      }else{
                          console.log("新增客源失败");
                      }
                  }).error(function(data){
                      console.log("发生错误，请求失败");
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
//                                  提交文件
                                $http.post('',formData,
                                {
                                    transformRequest: angular.identity,
                                    headers: {'Content-Type': undefined}
                                }).success(function(data){
                                    $scope.uploadSuccess = true;
                                    $scope.SuccessMsgShow = true;
                                        $scope.returnSuccessMsg = '上传成功';
                                        showMsg(event);
                                }).error(function(data){
                                    $scope.uploadFaild = true;
                                    $scope.SuccessMsgShow = false;
                                        $scope.returnErrorMsg = '上传失败';
                                        showMsg(event);
                                });
                            }
                        }else{
                            $scope.SuccessMsgShow = false;
                                $scope.returnErrorMsg = '请选择一个文件';
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
                  
                  
//                  车型
                  $http.get(window.location.origin+'/employee-manage/admin/getcartype').success(function(data){
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
                  $scope.areaOptions=['东区','南区','西区','北区'];
                  $scope.addCarObject.region=$scope.areaOptions[0];
//                  类型
                  $scope.typeOptions =['进口','国产'];
                  $scope.addCarObject.type=$scope.typeOptions[0];
//                  可售区域
                  $scope.saleRegionOptions=['全国','省内','小区域'];
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
                      
                      $http.post(window.location.origin+"/employee-manage/admin/createcar",postData).success(function(data){
                        if(data == "success"){
                            console.log(data);
//                              reGetCarTypeDatas();
//                              $scope.addCartTypeConfig = {
//                                      brand:"",
//                                      type:""
//                              };
                        }else{
                            console.log("新增车源失败");
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
                        $http.post(window.location.origin+"/employee-manage/admin/createcartype",postData).success(function(data){
                            if(data == "success"){
                                reGetCarTypeDatas();
                                $scope.addCartTypeConfig = {
                                        brand:"",
                                        type:""
                                };
                            }else{
                                console.log("新增车型失败");
                            }
                        });
                    }
                    
                };
                
                //获取Grid数据方法
                var reGetCarTypeDatas = function(){
                    
                    $http.get(window.location.origin+'/employee-manage/admin/getcartype').success(function(data){
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
                                        $http.post(window.location.origin+'/employee-manage/admin/carupload',formData,
                                        {
                                            transformRequest: angular.identity,
                                            headers: {'Content-Type': undefined}
                                        }).success(function(data){
                                            $scope.uploadSuccess = true;
                                            $scope.SuccessMsgShow = true;
                                            $scope.returnSuccessMsg = '上传成功';
                                            showMsg(event);
                                        }).error(function(data){
                                            $scope.uploadFaild = true;
                                            $scope.SuccessMsgShow = false;
                                            $scope.returnErrorMsg = '上传失败';
                                            showMsg(event);
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
                                    $http.post('',formData,
                                    {
                                        transformRequest: angular.identity,
                                        headers: {'Content-Type': undefined}
                                    }).success(function(data){
                                        $scope.uploadSuccess = true;
                                        $scope.SuccessMsgShow = true;
                                        $scope.returnSuccessMsg = '上传成功!';
                                        showMsg(event);
                                    }).error(function(data){
                                        $scope.uploadFaild = true;
                                        $scope.SuccessMsgShow = false;
                                        $scope.returnErrorMsg = '上传失败';
                                        showMsg(event);
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
        .state('index.reportform', {
            url: '/reportform',
            views: {
                'main@index': {
                    templateUrl:'jsp/view/adminView/reportFormManage/reportForm.html',
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
}]);


routerApp.filter('publicOrNot',function(){
    return function(field){
       if(field == "1"){
    	   return "公客";
       }else{
           return "私客";
       }
    }
});

routerApp.filter('topOrNot',function(){
    return function(field){
       if(field == "1"){
    	   return "置顶";
       }else{
           return "不置顶";
       }
    }
});

routerApp.filter('customerType',function(){
    return function(field){
       if(field == "1"){
    	   return "直接客户";
       }else{
           return "渠道客户";
       }
    }
});
