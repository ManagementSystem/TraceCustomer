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
import com.successfactors.bean.Users;
import com.successfactors.services.CarService;
import com.successfactors.services.CarTypeService;
import com.successfactors.services.UserService;
import com.successfactors.vo.CarVO;


@Controller
@RequestMapping(value="/admin")
public class AdminController extends BaseController{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CarTypeService carTypeService;
	
	@Autowired
	private CarService carService;
	
	
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
}
