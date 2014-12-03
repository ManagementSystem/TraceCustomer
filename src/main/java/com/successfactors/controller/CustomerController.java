package com.successfactors.controller;

import java.util.Date;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.successfactors.bean.ReturnValue;
import com.successfactors.services.CarService;
import com.successfactors.services.CustomerRemarkService;
import com.successfactors.services.CustomerService;
import com.successfactors.vo.CustomerRemarkVO;
import com.successfactors.vo.CustomerVO;

@Controller
@RequestMapping(value = "/customer")
public class CustomerController extends BaseController {

	@Autowired
	private CustomerService service;

	@Autowired
	private CustomerRemarkService remarkService;
	
	@Autowired
	private CarService carService;

	@RequestMapping(value = "/getcustomer", method = RequestMethod.POST)
	@ResponseBody
	public ReturnValue getCustomers(@RequestBody Map<String, String> conditions) {
		conditions.put("importName", getUserName());
		//条件or
		//conditions.put("ispublic", "1");
		
		return service.getCustomerData(conditions,true);
	}
	
	@RequestMapping(value = "/querycustomer", method = RequestMethod.POST)
	@ResponseBody
	public ReturnValue queryCustomers(@RequestBody Map<String, String> conditions){
		conditions.put("importName", getUserName());
		return service.queryCustomerData(conditions, true);
	}

	@RequestMapping(value = "/createcustomer", method = RequestMethod.POST)
	@ResponseBody
	public String createCustomer(@RequestBody CustomerVO vo) {
		vo.setImportName(getUserName());
		vo.setImportTime(new Date());
		return service.addCustomer(vo);
	}

	@RequestMapping(value = "/addremark", method = RequestMethod.POST)
	@ResponseBody
	public String addCustomerRemark(@RequestBody CustomerRemarkVO vo) {
		vo.setRemarkMan(getUserName());
		return remarkService.addCustomerRemark(vo);
	}

	@RequestMapping(value = "/getremarks")
	@ResponseBody
	public ReturnValue getCustomerRemark(
			@RequestParam(value = "customerid") Long id,
			@RequestParam(value = "currentPage", required = false, defaultValue = "1") int currentPage,
			@RequestParam(value = "itemsPerPage", required = false, defaultValue = "20") int itemsPerPage) {
		return remarkService.getCustomerRemarks(id, currentPage, itemsPerPage);
	}
	
	@RequestMapping(value = "/getcar")
	@ResponseBody
	public ReturnValue getCar(@RequestBody Map<String, String> conditions){
		return carService.getCarsDataToCustomer(conditions);
	}
	
	@RequestMapping(value="/querycar", method = RequestMethod.POST)
	@ResponseBody
	public ReturnValue queryCar(@RequestBody Map<String, String> conditions){
		return carService.queryCarsData(conditions);
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
		return service.importCustomer(file, path,suffix,getUserName());
	}
	
	
}
