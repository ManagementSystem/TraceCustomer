package com.successfactors.services;

import java.util.Map;

import com.successfactors.bean.ReturnValue;
import com.successfactors.vo.CarVO;

public interface CarService {
	
	public String addCar(CarVO carVO);
	
	public ReturnValue getCarsData(int currentPage,int itemPerPage);
	
	public ReturnValue queryCarsData(Map<String, String> conditions);
	
}
