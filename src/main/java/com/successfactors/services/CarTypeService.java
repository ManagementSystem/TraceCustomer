package com.successfactors.services;

import java.util.List;

import com.successfactors.bean.CarType;

public interface CarTypeService {
	
	public String addCarType(CarType cartype);
	
	public List<CarType> getAllType();
	
	public String deleteCarType(Long id);
	
}
