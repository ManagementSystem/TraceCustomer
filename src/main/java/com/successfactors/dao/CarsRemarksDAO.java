package com.successfactors.dao;

import com.successfactors.bean.CarsRemarks;
import com.successfactors.bean.Page;

public interface CarsRemarksDAO extends GenericDAO<CarsRemarks, Long>{
	
	public Page<CarsRemarks> getRemarks(Long carId, int currentPage,int itemPerPage);
}
