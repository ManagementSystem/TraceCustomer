package com.successfactors.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.successfactors.bean.ReturnValue;
import com.successfactors.services.CarService;
import com.successfactors.services.CarsRemarkService;
import com.successfactors.services.CustomerService;


@RequestMapping(value="/supply")
@Controller
public class SupplyController extends BaseController{
	
	@Autowired
	private CarService carService;
	
	@Autowired
	private CarsRemarkService carRemarkService;
	
	@Autowired
	private CustomerService customerService;
	

	@RequestMapping(value="/getcar",method = RequestMethod.POST)
	@ResponseBody
	public ReturnValue getCars(@RequestBody Map<String, String> conditions){
		
		return carService.getCars(conditions);
		
	}
	
}
