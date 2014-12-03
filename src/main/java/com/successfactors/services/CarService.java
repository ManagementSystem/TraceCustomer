package com.successfactors.services;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.successfactors.bean.Car;
import com.successfactors.bean.ReturnValue;
import com.successfactors.vo.CarVO;

public interface CarService {
	
	public String addCar(CarVO carVO);
	
//	public ReturnValue getCarsData(int currentPage,int itemPerPage);
	
	public ReturnValue getCars(Map<String, String> conditions);
	
	
	public ReturnValue queryCarsData(Map<String, String> conditions);
	
	public String importCars(MultipartFile mFile,String path,String suffix,String operator);
	
	public ReturnValue getCarsDataToCustomer(Map<String, String> conditions);
	
	public String delCar(Long id);
	
	public String updateCar(Car car);
	
}
