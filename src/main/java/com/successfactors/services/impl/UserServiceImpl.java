package com.successfactors.services.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.successfactors.bean.Users;
import com.successfactors.constant.UserConstants;
import com.successfactors.controller.UserController;
import com.successfactors.dao.UsersDAO;
import com.successfactors.services.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	private static Logger logger = Logger.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UsersDAO usersDao;

	@Override
	@Transactional
	public boolean modifyUserPwd(String userName,String pwd) {
		// TODO Auto-generated method stub
		try{
			logger.info("find user by id " + userName);
			Users user = usersDao.findById(userName);
			if(user != null){
				user.setPassword(pwd);
				usersDao.save(user);
				return true;
			}else{
				logger.info("User do not exist");
				return false;
			}
		}catch(Exception ex){
			logger.error(ex.getMessage());
			return false;
		}
	}

	@Override
	public boolean pwdIsRight(String userName, String pwd) {
		// TODO Auto-generated method stub
		try {
			logger.info("find user by id " + userName);
			Users user = usersDao.findById(userName);
			if(user != null){
				if(pwd.equals(user.getPassword())){
					return true;
				}else{
					logger.info("password error");
					return false;
				}
			}else{
				logger.info("user do not exist");
				return false;
			}
		} catch (Exception e) {
			// TODO: handle exception
			logger.error(e.getMessage());
			return false;
		}
		
	}

	@Override
	@Transactional
	public String createUser(Users user) {
		// TODO Auto-generated method stub
		String returnMsg = UserConstants.RETURN_FAIL;
		String username = user.getUsername();
		
		if(!usersDao.isExist(username)){
			user.setPassword("123456");
			usersDao.save(user);
			returnMsg = UserConstants.RETURN_SUCCESS;
		}else{
			returnMsg = UserConstants.USER_ISEXIST;
		}
		return returnMsg;
	}

	@Override
	public String importUsers() {
		// TODO Auto-generated method stub
		return null;
	}

}
