package com.successfactors.dao;

import java.util.List;

import com.successfactors.bean.Users;


public interface UsersDAO extends GenericDAO<Users, String>{
	public List<Users> getUsersByType(String type);
	
}
