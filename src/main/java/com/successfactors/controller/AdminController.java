package com.successfactors.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.successfactors.bean.CarType;
import com.successfactors.bean.ReturnValue;
import com.successfactors.bean.Users;
import com.successfactors.services.CarService;
import com.successfactors.services.CarTypeService;
import com.successfactors.services.CustomerService;
import com.successfactors.services.UserService;
import com.successfactors.vo.CarVO;
import com.successfactors.vo.CustomerVO;


@Controller
@RequestMapping(value="/admin")
public class AdminController extends BaseController{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CarTypeService carTypeService;
	
	@Autowired
	private CarService carService;
	
	@Autowired
	private CustomerService customerService;
	
	
	@RequestMapping(value="/createuser",method=RequestMethod.POST)
	@ResponseBody
	public String createUser(@RequestBody Users user){
		
		return userService.createUser(user);
	
	}
	
	@RequestMapping(value="/createcartype",method=RequestMethod.POST)
	@ResponseBody
	public String createCarType(@RequestBody CarType carType){
		
		return carTypeService.addCarType(carType);
		
	}
	
	
	@RequestMapping(value="/createcar",method=RequestMethod.POST)
	@ResponseBody
	public String createCar(@RequestBody CarVO car){
		//car.setOperator(getUserName());
		car.setOperator("zjw");
		return carService.addCar(car);
	}
	
	@RequestMapping(value="/getcartype",method=RequestMethod.GET)
	@ResponseBody
	public List<CarType> getCarTypes(){
		return carTypeService.getAllType();
	}
	
	
	@RequestMapping(value="/delcartype",method=RequestMethod.GET)
	@ResponseBody
	public String delCarType(@RequestParam("id") Long id){
		return carTypeService.deleteCarType(id);
	}
	
	@RequestMapping(value="/getcar",method=RequestMethod.GET)
	@ResponseBody
	public ReturnValue getCars(@RequestParam("currentPage") int currentPage,@RequestParam("itemsPerPage") int itemsPerPage){
		return carService.getCarsData(currentPage, itemsPerPage);
	}
	
	
	@RequestMapping(value="/querycar",method=RequestMethod.POST)
	@ResponseBody
	public ReturnValue getCarsByCondition(@RequestBody Map<String, String> conditions){
		return carService.queryCarsData(conditions);
		
	}
	
	
	@RequestMapping(value="/getcustomer",method=RequestMethod.GET)
	@ResponseBody
	public ReturnValue getCustomerData(@RequestParam("currentPage") int currentPage,@RequestParam("itemsPerPage") int itemsPerPage){
		return customerService.getCustomerData(currentPage, itemsPerPage);
	}
	
	@RequestMapping(value="/querycustomer",method=RequestMethod.POST)
	@ResponseBody
	public ReturnValue queryCustomerData(@RequestBody Map<String, String> conditions){
		return customerService.queryCustomerData(conditions);
	}
	
	@RequestMapping(value="/createcustomer",method=RequestMethod.POST)
	@ResponseBody
	public String createCustomer(@RequestBody CustomerVO vo){
		vo.setImportName("zjw");
		vo.setImportTime(new Date());
		return customerService.addCustomer(vo);
	}
	
}
