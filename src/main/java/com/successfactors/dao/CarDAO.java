package com.successfactors.dao;

import java.util.Map;

import com.successfactors.bean.Car;
import com.successfactors.bean.CarsRemarks;
import com.successfactors.bean.Page;

public interface CarDAO extends GenericDAO<Car, Long>{
	
	public Page<Car> getCar(int currentPage,int itemPerPage);
	
	public Page<Car> queryCars(Map<String, String> conditions);
	
	public Page<Car> getCarToCustomer(int currentPage,int itemPerPage);
//	

}
