package com.successfactors.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.successfactors.bean.ReturnValue;
import com.successfactors.services.CustomerService;


@Controller
@RequestMapping(value = "/customer")
public class CustomerController {
	
	@Autowired
	private CustomerService service;
	
	@RequestMapping(value= "get")
	@ResponseBody
	public ReturnValue getCustomer(@RequestParam("currentPage") int currentPage,@RequestParam("itemsPerPage") int itemsPerPage){
		return service.getCustomerData(currentPage, itemsPerPage);
	}
}
