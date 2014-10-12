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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.successfactors.bean.Users;
import com.successfactors.constant.UserAuthConstants;
import com.successfactors.dao.UsersDAO;


@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UsersDAO userDao;
	
	
	@Override
	@Transactional
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
		if(permission.equals(UserAuthConstants.ROLE_ADMIN)){
//			authSet.add(new SimpleGrantedAuthority(UserAuthConstants.ROLE_SUPPLY));
//			authSet.add(new SimpleGrantedAuthority(UserAuthConstants.ROLE_CUSTOMER));
			authSet.add(new SimpleGrantedAuthority(UserAuthConstants.ROLE_ADMIN));			
		}else if(permission.equals(UserAuthConstants.ROLE_CUSTOMER)){
			authSet.add(new SimpleGrantedAuthority(UserAuthConstants.ROLE_CUSTOMER));
		}else if(permission.equals(UserAuthConstants.ROLE_SUPPLY)){
			authSet.add(new SimpleGrantedAuthority(UserAuthConstants.ROLE_SUPPLY));
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
