package com.successfactors.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.successfactors.services.HelloWorldService;


@Controller
public class HelloWorldController {
	
	Logger log = Logger.getLogger(HelloWorldController.class);
	
	@Autowired
	private HelloWorldService service;
	
	
	public HelloWorldService getService() {
		return service;
	}


	public void setService(HelloWorldService service) {
		this.service = service;
	}


	@RequestMapping(value="/hello")
	@ResponseBody
	public String helloworld(){
		return service.hello();
	}
}
