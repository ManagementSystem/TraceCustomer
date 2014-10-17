package com.successfactors.services;

import com.successfactors.bean.ReturnValue;
import com.successfactors.vo.CarVO;

public interface CarService {
	
	public String addCar(CarVO carVO);
	
	public ReturnValue getCarsData(int currentPage,int itemPerPage);
	
}
