package com.successfactors.dao;

import com.successfactors.bean.CustomerRemarks;
import com.successfactors.bean.Page;

public interface CustomerRemarkDAO extends GenericDAO<CustomerRemarks, Long>{
	
	
	public Page<CustomerRemarks> getRemarks(Long customerId, int currentPage,int itemPerPage);
}
