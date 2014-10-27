package com.successfactors.services;

import com.successfactors.bean.CarsRemarks;
import com.successfactors.bean.Page;
import com.successfactors.bean.ReturnValue;
import com.successfactors.vo.CustomerRemarkVO;

public interface CustomerRemarkService {
	
	public String addCustomerRemark(CustomerRemarkVO vo);
	
	public ReturnValue getCustomerRemarks(Long id, int currentPage,int itemsPerPage);
}
