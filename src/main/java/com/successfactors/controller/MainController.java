package com.successfactors.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class MainController {
	
	@RequestMapping(value="/login")
	public ModelAndView getIndexPage(){
		return new ModelAndView("login.jsp");
	}
	
	@RequestMapping(value={"/index","/"})
	public ModelAndView indexPage(){
		return new ModelAndView("welcome.jsp");
	}
	
//	@RequestMapping(value={"/index","/"})
//	public void indexPage(HttpServletRequest request,HttpServletResponse response) throws IOException{
//		response.sendRedirect("welcome.html");
//		
//	}
	
}
