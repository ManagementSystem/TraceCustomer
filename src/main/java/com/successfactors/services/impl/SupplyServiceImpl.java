package com.successfactors.services.impl;

import org.springframework.transaction.annotation.Transactional;

import com.successfactors.bean.Car;
import com.successfactors.services.SupplyService;

public class SupplyServiceImpl implements SupplyService {

	@Override
	@Transactional
	public String saveCar(Car car) {
		// TODO Auto-generated method stub
		String returnMsg = "";
		
		return "";
	}

}
