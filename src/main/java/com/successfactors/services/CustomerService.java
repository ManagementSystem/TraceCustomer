package com.successfactors.services;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.successfactors.bean.ReturnValue;
import com.successfactors.vo.CarVO;
import com.successfactors.vo.CustomerVO;

public interface CustomerService {
	
	public ReturnValue getCustomerData(int currentPage,int itemsPerPage);
	
	public ReturnValue queryCustomerData(Map<String, String> conditions);
	
	public String addCustomer(CustomerVO vo);
	
	public String importCustomer(MultipartFile mFile,String path,String suffix);
	
}
