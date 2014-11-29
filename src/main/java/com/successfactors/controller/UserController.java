package com.successfactors.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.successfactors.bean.CarType;
import com.successfactors.bean.ReturnValue;
import com.successfactors.services.CarTypeService;
import com.successfactors.services.CarsRemarkService;
import com.successfactors.services.CustomerRemarkService;
import com.successfactors.services.UserService;
import com.successfactors.vo.CarRemarkVO;
import com.successfactors.vo.CustomerRemarkVO;


@Controller
@RequestMapping(value="/user")
public class UserController extends BaseController{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CarTypeService carTypeService;
	
	@Autowired
	private CarsRemarkService carRemarkService;
	
	@Autowired
	private CustomerRemarkService customerRemarkService;
	
	@RequestMapping(value="/modifypwd")
	@ResponseBody
	public ReturnValue modifyPwd(String oldPwd,String pwd,String againPwd){
		
		ReturnValue returnValue = new ReturnValue();
		if(oldPwd == null || pwd == null || againPwd == null){
			returnValue.setError();
			return returnValue;
		}
		String userName = getUserName();
		if(userService.pwdIsRight(userName, oldPwd)){
			if(pwd.equals(againPwd)){
				userService.modifyUserPwd(userName, pwd);
				returnValue.setSuccess();
			}else{
				returnValue.setError();
			}
		}else{
			returnValue.setError();
		}
		return returnValue;
	}
	
	@RequestMapping(value="/getusername")
	@ResponseBody
	public String getName(){
		return getUserName();
	}
	
	@RequestMapping(value="/getcartype")
	@ResponseBody
	public List<CarType> getCarType(){
		return carTypeService.getAllType();
	}
	
	@RequestMapping(value="/addcarremark",method=RequestMethod.POST)
	@ResponseBody
	public String addCarRemark(@RequestBody CarRemarkVO vo){		
		vo.setRemarkMan(getUserName());
		return carRemarkService.addCarsRemark(vo);
		
	}
	
	@RequestMapping(value="/getcarremarks",method=RequestMethod.GET)
	@ResponseBody
	public ReturnValue getCarRemark(@RequestParam(value="carid") Long id,
									@RequestParam(value="currentPage",required = false,defaultValue="1") int currentPage,
									@RequestParam(value="itemsPerPage",required = false,defaultValue="20") int itemsPerPage){
		
		return carRemarkService.getCarsRemarks(id, currentPage, itemsPerPage);
		
	}
	
	@RequestMapping(value="/addcustomerremark",method=RequestMethod.POST)
	@ResponseBody
	public String addCustomerRemark(@RequestBody CustomerRemarkVO vo){
		vo.setRemarkMan(getUserName());
		return customerRemarkService.addCustomerRemark(vo);
	}
	
	
	@RequestMapping(value="/getcustomerremarks",method=RequestMethod.GET)
	@ResponseBody
	public ReturnValue getCustomerRemark(@RequestParam(value="customerid") Long id,
										@RequestParam(value="currentPage",required = false,defaultValue="1") int currentPage,
										@RequestParam(value="itemsPerPage",required = false,defaultValue="20") int itemsPerPage){
		
		return customerRemarkService.getCustomerRemarks(id, currentPage, itemsPerPage);
		
	}
}
