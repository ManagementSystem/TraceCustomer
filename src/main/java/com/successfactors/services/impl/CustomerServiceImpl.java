package com.successfactors.services.impl;


import java.io.File;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.successfactors.bean.Car;
import com.successfactors.bean.CarType;
import com.successfactors.bean.Customer;
import com.successfactors.bean.Page;
import com.successfactors.bean.ReturnValue;
import com.successfactors.constant.ReturnValueConstants;
import com.successfactors.dao.CarTypeDAO;
import com.successfactors.dao.CustomerDAO;
import com.successfactors.services.CustomerService;
import com.successfactors.util.FileUtil;
import com.successfactors.util.ReadExcelUtil;
import com.successfactors.vo.CustomerVO;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private CustomerDAO customerDao;
	
	@Autowired
	private CarTypeDAO carTypeDao;
	
	private Logger logger = Logger.getLogger(CustomerServiceImpl.class);

	private static final String EXCEL_DIR = "\\excel\\";
	
	private static final String CUSTOMER_EXCEL_FILE = "customer_import";
	@Transactional
	public ReturnValue getCustomerData(int currentPage,int itemsPerPage){
		
		ReturnValue returnValue = new ReturnValue();
		try{
			Page<Customer> page = customerDao.getCustomers(currentPage, itemsPerPage);
			returnValue.setSuccess();
			returnValue.setReturnData(page);
		}catch(Exception ex){
			returnValue.setError();
		}
		
		return returnValue;
	}
	
	
	public CustomerDAO getCustomerDao() {
		return customerDao;
	}

	public void setCustomerDao(CustomerDAO customerDao) {
		this.customerDao = customerDao;
	}


	@Override
	@Transactional
	public ReturnValue queryCustomerData(Map<String, String> conditions) {
		// TODO Auto-generated method stub
		ReturnValue returnValue = new ReturnValue();
		try {
			Page<Customer> page = customerDao.queryCustomer(conditions);
			returnValue.setSuccess();
			returnValue.setReturnData(page);
		} catch (Exception e) {
			// TODO: handle exception
			returnValue.setError();
		}
		return returnValue;
	}


	@Override
	@Transactional
	public String addCustomer(CustomerVO vo) {
		// TODO Auto-generated method stub
		try{
			CarType carType = carTypeDao.getById((long) 1);
			Customer customer = new Customer();
			customer.setCustomerVO(vo);
			customer.setCarType(carType);
			customerDao.save(customer);
			return ReturnValueConstants.RETURN_SUCCESS;
		}catch(Exception ex){
			return ReturnValueConstants.RETURN_ERROR;
		}
	}


	public CarTypeDAO getCarTypeDao() {
		return carTypeDao;
	}


	public void setCarTypeDao(CarTypeDAO carTypeDao) {
		this.carTypeDao = carTypeDao;
	}


	@Override
	@Transactional
	public String importCustomer(MultipartFile mFile, String path, String suffix) {
		// TODO Auto-generated method stub
		String returnMsg = ReturnValueConstants.RETURN_ERROR;
		if(!mFile.isEmpty()){
			logger.info("upload car excel file");
			File file = new File(path + EXCEL_DIR);
			if(!file.exists()){
				file.mkdirs();
			}
			String filePath = path + EXCEL_DIR + CUSTOMER_EXCEL_FILE + "." + suffix;
			try{
				InputStream is = mFile.getInputStream();
				FileUtil.saveFile(is, filePath);
				List<Customer> cars = ReadExcelUtil.readCustomer(filePath);
				customerDao.add(cars);
				returnMsg = ReturnValueConstants.RETURN_SUCCESS;
			}catch(Exception ex){
				logger.error(ex.getMessage());
				returnMsg = ReturnValueConstants.RETURN_ERROR;
			}
			
		}else{
			returnMsg = ReturnValueConstants.RETURN_ERROR;
		}
		return returnMsg;
	}


	@Override
	@Transactional
	public ReturnValue getCustomerDataToCGroup(Map<String, String> conditions,boolean publicFlag) {
		// TODO Auto-generated method stub
		ReturnValue returnValue = new ReturnValue();
		try{
			Page<Customer> page = customerDao.getCustomers(conditions,publicFlag);
			returnValue.setSuccess();
			returnValue.setReturnData(page);
		}catch(Exception ex){
			returnValue.setError();
		}
		
		return returnValue;
	}
	
	
	
}
