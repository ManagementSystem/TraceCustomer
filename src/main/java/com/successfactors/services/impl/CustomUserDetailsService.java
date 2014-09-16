package com.successfactors.services.impl;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.successfactors.bean.Users;
import com.successfactors.constant.UserAuthConstants;
import com.successfactors.dao.UsersDAO;

public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UsersDAO userDao;
	
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserDetails userDetails = null;
		
		Users user = userDao.findById(username);
		
		if(user != null){
			userDetails = new User(user.getUsername().toUpperCase(), user.getPassword(), 
										true, true, true, true, getAuth(user.getPermission()));
		}
		
		return userDetails;
	}


	public Collection<? extends GrantedAuthority> getAuth(String permission) {
		// TODO Auto-generated method stub
		Set<GrantedAuthority> authSet = new HashSet<GrantedAuthority>();
		authSet.add(new SimpleGrantedAuthority(UserAuthConstants.ROLE_USER));
		if(permission.equals(UserAuthConstants.ROLE_ADMIN)){
			authSet.add(new SimpleGrantedAuthority(UserAuthConstants.ROLE_ADMIN));			
		}
		return authSet;
	}


	public UsersDAO getUserDao() {
		return userDao;
	}


	public void setUserDao(UsersDAO userDao) {
		this.userDao = userDao;
	}
	
	

}
