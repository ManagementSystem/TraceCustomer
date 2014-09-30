package com.successfactors.services.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.successfactors.bean.Customer;
import com.successfactors.bean.Page;
import com.successfactors.bean.ReturnValue;
import com.successfactors.dao.CustomerDAO;
import com.successfactors.services.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private CustomerDAO customerDao;

	
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
	
	
}
