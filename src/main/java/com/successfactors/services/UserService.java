package com.successfactors.services;

public interface UserService {
	
	public boolean modifyUserPwd(String userName,String pwd);
	
	public boolean pwdIsRight(String userName,String pwd);
}
