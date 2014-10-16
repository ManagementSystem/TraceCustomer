package com.successfactors.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.successfactors.bean.CarType;
import com.successfactors.constant.ReturnValueConstants;
import com.successfactors.dao.CarTypeDAO;
import com.successfactors.services.CarTypeService;


@Service
public class CarTypeServiceImpl implements CarTypeService{
	
	@Autowired
	CarTypeDAO dao;

	@Override
	@Transactional
	public String addCarType(CarType cartype) {
		// TODO Auto-generated method stub
		String result = "";
		dao.save(cartype);
		result = ReturnValueConstants.RETURN_SUCCESS;
		return result;
	}

	@Override
	@Transactional
	public List<CarType> getAllType() {
		// TODO Auto-generated method stub
		return dao.findAll();
		
	}

	@Override
	@Transactional
	public String deleteCarType(Long id) {
		// TODO Auto-generated method stub
		try{
			CarType carType = dao.findById(id);
			if(carType.getId() != null){
				dao.remove(carType);
				return ReturnValueConstants.RETURN_SUCCESS;
			}else{
				return ReturnValueConstants.RETURN_NOTEXIST;
			}
		}catch(Exception ex){
			return ReturnValueConstants.RETURN_ERROR;
		}
	}
}
