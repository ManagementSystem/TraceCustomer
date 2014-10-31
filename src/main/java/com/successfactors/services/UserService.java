package com.successfactors.services;

import com.successfactors.bean.Users;

public interface UserService {
	
	public boolean modifyUserPwd(String userName,String pwd);
	
	public boolean pwdIsRight(String userName,String pwd);
	
	public String createUser(Users user);
	
	public String importUsers();
}
