package com.successfactors.dao;

import com.successfactors.bean.Customer;
import com.successfactors.bean.Page;

public interface CustomerDAO extends GenericDAO<Customer, String>{
	
	public Page<Customer> getCustomers(int currentPage,int itemPerPage);
}
