package com.successfactors.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.successfactors.constant.UserAuthConstants;


@Controller
public class LoginController {
	protected static Logger logger = Logger.getLogger(LoginController.class);
	
	
	@RequestMapping(value = "/main",method = RequestMethod.POST)
	public ModelAndView getMainPage(){
		logger.debug("redirect to the main page");
		return new ModelAndView("main");
	}
	
	@RequestMapping(value = "/admin",method = RequestMethod.POST)
	public ModelAndView getAdminPage(){
		logger.debug("redirect to the admin manage page");
		return new ModelAndView("admin");
	}
	
	@RequestMapping(value = "/error")
	public ModelAndView getErrorPage(){
		logger.debug("redirect to the error page");
		return new ModelAndView("error");
	}
	
	@RequestMapping(value = "/dispatch")
	public ModelAndView dispatch(){
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		Collection<? extends GrantedAuthority> roles = Collections.unmodifiableCollection(userDetails.getAuthorities());
		
		
		if(userDetails != null){
			for (GrantedAuthority grantedAuthority : roles) {
				if(grantedAuthority.getAuthority().equals(UserAuthConstants.ROLE_ADMIN)){
					return getAdminPage();
				}else if(grantedAuthority.getAuthority().equals(UserAuthConstants.ROLE_USER)){
					return getMainPage();
				}
			}
		}
		return getErrorPage();
		
	}
}
