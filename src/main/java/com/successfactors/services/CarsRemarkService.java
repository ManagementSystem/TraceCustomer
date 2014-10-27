package com.successfactors.services;

import com.successfactors.bean.CarsRemarks;
import com.successfactors.bean.ReturnValue;
import com.successfactors.vo.CarRemarkVO;



public interface CarsRemarkService {
	
	public String addCarsRemark(CarRemarkVO vo);
	
	public ReturnValue getCarsRemarks(Long id, int currentPage,int itemsPerPage);
	
}
