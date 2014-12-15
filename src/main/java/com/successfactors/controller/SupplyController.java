package com.successfactors.controller;

import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
	
	
	@RequestMapping(value="/getcustomer",method = RequestMethod.POST)
	@ResponseBody
	public ReturnValue getCustomers(@RequestBody Map<String, String> conditions){
		conditions.put("importName", getUserName());
		return customerService.getCustomerDataToCarGroup(conditions, true); 
	}
	
	
	@RequestMapping(value="/querycar",method = RequestMethod.POST)
	@ResponseBody
	public ReturnValue queryCars(@RequestBody Map<String, String> conditions){
		
		return carService.queryCarsData(conditions);
		
	}
	
	@RequestMapping(value="/querycustomer",method = RequestMethod.POST)
	@ResponseBody
	public ReturnValue queryCustomers(@RequestBody Map<String, String> conditions){
		return customerService.queryCustomerDataToCarGroup(conditions, true); 
	}
	
	@RequestMapping(value="/carupload",method=RequestMethod.POST)
	@ResponseBody
	public String uploadCarSourceExcel(MultipartHttpServletRequest  request,HttpServletResponse response){
		Iterator<String> itr=request.getFileNames();
		String fileName = itr.next();
	    MultipartFile file=request.getFile(fileName);
	    
	    String[] str = fileName.split("\\.");
	    String suffix = str[str.length - 1];
	    String path = request.getServletContext().getRealPath("");
		return carService.importCars(file, path,suffix,getUserName());
	}
	
	@RequestMapping(value="/channelcarupload",method=RequestMethod.POST)
	@ResponseBody
	public String uploadChannelCarSourceExcel(MultipartHttpServletRequest  request,HttpServletResponse response){
		Iterator<String> itr=request.getFileNames();
		String fileName = itr.next();
	    MultipartFile file=request.getFile(fileName);
	    
	    String[] str = fileName.split("\\.");
	    String suffix = str[str.length - 1];
	    String path = request.getServletContext().getRealPath("");
		return carService.importChannelCars(file, path,suffix,getUserName());
	}
	
	
	
}
