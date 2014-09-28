package com.successfactors.controller;

import org.apache.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class BaseController {
	private static Logger logger = Logger.getLogger(BaseController.class);
	
	protected String getUserName(){
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		logger.info("Get user:"+ userDetails.getUsername());
		return userDetails.getUsername();
	}
}
