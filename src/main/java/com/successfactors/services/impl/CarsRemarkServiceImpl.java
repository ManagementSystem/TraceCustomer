package com.successfactors.services.impl;

import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.successfactors.bean.Car;
import com.successfactors.bean.CarsRemarks;
import com.successfactors.bean.Page;
import com.successfactors.bean.ReturnValue;
import com.successfactors.constant.ReturnValueConstants;
import com.successfactors.dao.CarDAO;
import com.successfactors.dao.CarsRemarksDAO;
import com.successfactors.services.CarsRemarkService;
import com.successfactors.vo.CarRemarkVO;


@Service
public class CarsRemarkServiceImpl implements CarsRemarkService{
	
	private static Logger logger = Logger.getLogger(CarsRemarkServiceImpl.class);

	@Autowired
	private CarsRemarksDAO dao;
	
	
	@Autowired
	private CarDAO carDao;
	
	
	@Override
	@Transactional
	public String addCarsRemark(CarRemarkVO vo) {
		// TODO Auto-generated method stub
		try {
			Car car = carDao.getById(vo.getCarId());
			if(car == null){
				return ReturnValueConstants.RETURN_NOTEXIST;
			}
			CarsRemarks carRemark = new CarsRemarks();
			carRemark.setVO(vo);
			carRemark.setUpdateTime(new Date());
			carRemark.setCar(car);
			car.setLastModifyTime(new Date());
			carDao.save(car);
			dao.save(carRemark);
			return ReturnValueConstants.RETURN_SUCCESS;
		} catch (Exception e) {
			// TODO: handle exception
			logger.error(e.getMessage());
			return ReturnValueConstants.RETURN_ERROR;
		}
		
	}


	@Override
	@Transactional
	public ReturnValue getCarsRemarks(Long id, int currentPage, int itemsPerPage) {
		// TODO Auto-generated method stub
		ReturnValue returnValue = new ReturnValue();
		try{
			Page<CarsRemarks> page = dao.getRemarks(id, currentPage, itemsPerPage);
			returnValue.setReturnData(page);
			returnValue.setSuccess();
		}catch(Exception ex){
			logger.error(ex.getMessage());
			returnValue.setError();
		}
		return returnValue;
	}

}
