package com.successfactors.controller;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.connector.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.successfactors.bean.Car;
import com.successfactors.bean.CarType;
import com.successfactors.bean.Customer;
import com.successfactors.bean.Page;
import com.successfactors.bean.Report;
import com.successfactors.bean.ReturnValue;
import com.successfactors.bean.Users;
import com.successfactors.services.CarService;
import com.successfactors.services.CarTypeService;
import com.successfactors.services.CarsRemarkService;
import com.successfactors.services.CustomerRemarkService;
import com.successfactors.services.CustomerService;
import com.successfactors.services.ReportService;
import com.successfactors.services.UserService;
import com.successfactors.vo.CarRemarkVO;
import com.successfactors.vo.CarVO;
import com.successfactors.vo.CustomerRemarkVO;
import com.successfactors.vo.CustomerVO;
import com.successfactors.vo.ReportVO;


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
	
	@Autowired
	private CarsRemarkService carRemarkService;
	
	@Autowired
	private CustomerRemarkService customerRemarkService;
	
	@Autowired
	private ReportService reportService;
	
	
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
		car.setChannelFlag(0);
		car.setOperator(getUserName());
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
	
	@RequestMapping(value="/getcar",method=RequestMethod.POST)
	@ResponseBody
	public ReturnValue getCars(@RequestBody Map<String, String> conditions){
		return carService.getCars(conditions);
	}
	
	
	@RequestMapping(value="/querycar",method=RequestMethod.POST)
	@ResponseBody
	public ReturnValue getCarsByCondition(@RequestBody Map<String, String> conditions){
		return carService.queryCarsData(conditions);
		
	}
	
	
	@RequestMapping(value="/getcustomer",method=RequestMethod.POST)
	@ResponseBody
	public ReturnValue getCustomerData(@RequestBody Map<String, String> conditions){
		return customerService.getCustomerData(conditions,false);
	}
	
	@RequestMapping(value="/querycustomer",method=RequestMethod.POST)
	@ResponseBody
	public ReturnValue queryCustomerData(@RequestBody Map<String, String> conditions){
		return customerService.queryCustomerData(conditions,false);
	}
	
	@RequestMapping(value="/createcustomer",method=RequestMethod.POST)
	@ResponseBody
	public String createCustomer(@RequestBody CustomerVO vo){
		vo.setImportName(getUserName());
		return customerService.addCustomer(vo);
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
	
	@RequestMapping(value="/userupload",method=RequestMethod.POST)
	@ResponseBody
	public String uploadUsersExcel(MultipartHttpServletRequest  request,HttpServletResponse response){
		Iterator<String> itr=request.getFileNames();
		String fileName = itr.next();
	    MultipartFile file=request.getFile(fileName);
	    String[] str = fileName.split("/.");
	    String suffix = str[str.length - 1];
	    String path = request.getServletContext().getRealPath("");
		return userService.importUsers(file, path,suffix);
	}
	
	@RequestMapping(value="/customerupload",method=RequestMethod.POST)
	@ResponseBody
	public String uploadCustomersExcel(MultipartHttpServletRequest  request,HttpServletResponse response){
		Iterator<String> itr=request.getFileNames();
		String fileName = itr.next();
	    MultipartFile file=request.getFile(fileName);
	    String[] str = fileName.split("/.");
	    String suffix = str[str.length - 1];
	    String path = request.getServletContext().getRealPath("");
		return customerService.importCustomer(file, path,suffix,getUserName());
	}
	
	@RequestMapping(value="/getreport",method=RequestMethod.POST)
	@ResponseBody
	public ReturnValue getReport(@RequestBody ReportVO vo){
		return reportService.getReport(vo.getStartTime(), vo.getEndTime(), vo.getCurrentPage(), vo.getItemsPerPage());
	}
	
	@RequestMapping(value="/delcustomer",method=RequestMethod.GET)
	@ResponseBody
	public String delCustomer(@RequestParam(value="id",required=true)Long id){
		
		return customerService.delCustomerById(id);
		
	}
	
	@RequestMapping(value="/delcar",method=RequestMethod.GET)
	@ResponseBody
	public String delCar(@RequestParam(value="id",required=true)Long id){
		
		return carService.delCar(id);
		
	}
	
	@RequestMapping(value="/updatecustomer",method=RequestMethod.POST)
	@ResponseBody
	public String updateCustomer(@RequestBody Customer customer){
		
		return customerService.updateCustomer(customer);
	}
	
	@RequestMapping(value="/updatecar",method=RequestMethod.POST)
	@ResponseBody
	public String updateCar(@RequestBody Car car){
		return carService.updateCar(car);
	}
	
	@RequestMapping(value="/createchannelcar",method=RequestMethod.POST)
	@ResponseBody
	public String createChannelCar(@RequestBody CarVO vo){
		vo.setChannelFlag(1);
		vo.setOperator(getUserName());
		return carService.addCar(vo);
	}
}
