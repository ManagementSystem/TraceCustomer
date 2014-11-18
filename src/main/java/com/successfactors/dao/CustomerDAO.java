package com.successfactors.dao;

import java.util.Map;

import com.successfactors.bean.Customer;
import com.successfactors.bean.Page;

public interface CustomerDAO extends GenericDAO<Customer, Long>{
	
	public Page<Customer> getCustomers(int currentPage,int itemPerPage);
	
	public Page<Customer> queryCustomer(Map<String, String> conditions);
	
	public Page<Customer> getCustomers(Map<String, String> conditions,boolean publicFlag);
	
}
