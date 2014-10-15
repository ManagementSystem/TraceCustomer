package com.successfactors.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.successfactors.bean.Users;
import com.successfactors.services.UserService;


@Controller
@RequestMapping(value="/admin")
public class AdminController {
	
	@Autowired
	UserService userService;
	
	
	@RequestMapping(value="/createuser",method=RequestMethod.POST)
	@ResponseBody
	public String createUser(@RequestBody Users user){
		
		return userService.createUser(user);
	
	}
}
