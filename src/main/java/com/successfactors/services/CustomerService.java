package com.successfactors.services;

import com.successfactors.bean.ReturnValue;

public interface CustomerService {
	
	public ReturnValue getCustomerData(int currentPage,int itemsPerPage);
	
}
