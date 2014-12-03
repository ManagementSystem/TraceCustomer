package com.successfactors.services.impl;

import java.io.File;
import java.io.InputStream;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.successfactors.bean.Users;
import com.successfactors.constant.ReturnValueConstants;
import com.successfactors.constant.UserConstants;
import com.successfactors.dao.UsersDAO;
import com.successfactors.services.UserService;
import com.successfactors.util.FileUtil;
import com.successfactors.util.ReadExcelUtil;

@Service
public class UserServiceImpl implements UserService {
	
	private static Logger logger = Logger.getLogger(UserServiceImpl.class);
	
	
	//private static final String USER_EXCEL_DIR = System.getProperty("user.dir") + "/excel";
	
	private static final String USER_EXCEL_FILE = "user_import";
	
	private static final String EXCEL_DIR = "\\excel\\";
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
	@Transactional
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
	@Transactional
	public String importUsers(MultipartFile mFile,String path,String suffix) {
		// TODO Auto-generated method stub
		String returnMsg = ReturnValueConstants.RETURN_ERROR;
		if(!mFile.isEmpty()){
			logger.info("upload user excel file");
			File file = new File(path + EXCEL_DIR);
			if(!file.exists()){
				file.mkdirs();
			}
			String filePath = path + EXCEL_DIR + USER_EXCEL_FILE + ".xls" ;
			try{
				InputStream is = mFile.getInputStream();
				FileUtil.saveFile(is, filePath);
				List<Users> users = ReadExcelUtil.readUsers(filePath);
				usersDao.add(users);
				returnMsg = ReturnValueConstants.RETURN_SUCCESS;
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
			
		}else{
			returnMsg = ReturnValueConstants.RETURN_ERROR;
		}
		return returnMsg;
	}
	
	

}
