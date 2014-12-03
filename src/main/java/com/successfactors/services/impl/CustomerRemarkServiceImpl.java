package com.successfactors.services.impl;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.successfactors.bean.CarsRemarks;
import com.successfactors.bean.Customer;
import com.successfactors.bean.CustomerRemarks;
import com.successfactors.bean.Page;
import com.successfactors.bean.ReturnValue;
import com.successfactors.constant.ReturnValueConstants;
import com.successfactors.dao.CustomerDAO;
import com.successfactors.dao.CustomerRemarkDAO;
import com.successfactors.services.CustomerRemarkService;
import com.successfactors.vo.CustomerRemarkVO;

@Service
public class CustomerRemarkServiceImpl implements CustomerRemarkService{

	private static Logger logger = Logger.getLogger(CustomerRemarkServiceImpl.class);
	
	@Autowired
	private CustomerDAO customerDao;
	
	@Autowired
	private CustomerRemarkDAO customerRemarkDao;
	
	
	@Override
	@Transactional
	public String addCustomerRemark(CustomerRemarkVO vo) {
		// TODO Auto-generated method stub
		try {
			Customer customer = customerDao.getById(vo.getCustomerId());
			if(customer == null){
				return ReturnValueConstants.RETURN_NOTEXIST;
			}
			CustomerRemarks customerRemark = new CustomerRemarks();
			customerRemark.setVO(vo);
			customerRemark.setUpdateTime(new Date());
			customerRemark.setCustomer(customer);
			customerRemarkDao.save(customerRemark);
			return ReturnValueConstants.RETURN_SUCCESS;
		} catch (Exception e) {
			// TODO: handle exception
			logger.error(e.getMessage());
			return ReturnValueConstants.RETURN_ERROR;
		}
	}


	@Override
	@Transactional
	public ReturnValue getCustomerRemarks(Long id, int currentPage,
			int itemsPerPage) {
		// TODO Auto-generated method stub
		ReturnValue returnValue = new ReturnValue();
		try{
			Page<CustomerRemarks> page = customerRemarkDao.getRemarks(id, currentPage, itemsPerPage);
			returnValue.setReturnData(page);
			returnValue.setSuccess();
		}catch(Exception ex){
			logger.error(ex.getMessage());
			returnValue.setError();
		}
		return returnValue;
	}



}
