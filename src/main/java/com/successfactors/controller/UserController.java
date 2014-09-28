package com.successfactors.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.successfactors.bean.ReturnValue;
import com.successfactors.bean.Users;
import com.successfactors.services.UserService;
import com.successfactors.services.impl.UserServiceImpl;


@Controller
@RequestMapping(value="/user")
public class UserController extends BaseController{
	
	private UserService userService;
	
	
	@RequestMapping(value="/modifypwd")
	@ResponseBody
	public ReturnValue modifyPwd(String oldPwd,String pwd,String againPwd){
		
		ReturnValue returnValue = new ReturnValue();
		if(oldPwd == null || pwd == null || againPwd == null){
			returnValue.setError();
			return returnValue;
		}
		String userName = getUserName();
		if(userService.pwdIsRight(userName, oldPwd)){
			if(pwd.equals(againPwd)){
				userService.modifyUserPwd(userName, pwd);
				returnValue.setSuccess();
			}else{
				returnValue.setError();
			}
		}else{
			returnValue.setError();
		}
		return returnValue;
	}
}
