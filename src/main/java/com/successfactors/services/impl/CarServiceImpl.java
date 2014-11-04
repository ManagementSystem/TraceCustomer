package com.successfactors.services.impl;

import java.io.File;
import java.io.InputStream;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.successfactors.bean.Car;
import com.successfactors.bean.CarType;
import com.successfactors.bean.Page;
import com.successfactors.bean.ReturnValue;
import com.successfactors.constant.ReturnValueConstants;
import com.successfactors.dao.CarDAO;
import com.successfactors.dao.CarTypeDAO;
import com.successfactors.dao.CustomerDAO;
import com.successfactors.services.CarService;
import com.successfactors.util.FileUtil;
import com.successfactors.vo.CarVO;


@Service
public class CarServiceImpl implements CarService{

	@Autowired
	private CarDAO dao;
	
	
	@Autowired
	private CarTypeDAO carTypeDao;
	
	private static Logger logger = Logger.getLogger(CarServiceImpl.class);
	
	
	private static final String EXCEL_DIR = "/excel/";
	
	private static final String CAR_EXCEL_FILE = "car_import.xsl";
	
	@Override
	@Transactional
	public String addCar(CarVO carVO) {
		// TODO Auto-generated method stub
		try{
			CarType carType = carTypeDao.findById(carVO.getCarTypeId());
			Car car = new Car();
			car.setCarVO(carVO);
			car.setCarType(carType);
			
			dao.save(car);
			return ReturnValueConstants.RETURN_SUCCESS;
		}catch(Exception ex){
			logger.error(ex.getMessage());
			return ReturnValueConstants.RETURN_ERROR;
		}
	}


	public CarDAO getDao() {
		return dao;
	}


	public void setDao(CarDAO dao) {
		this.dao = dao;
	}


	@Override
	@Transactional
	public ReturnValue getCarsData(int currentPage, int itemPerPage) {
		// TODO Auto-generated method stub
		ReturnValue returnValue = new ReturnValue();
		try {
			Page<Car> page = dao.getCar(currentPage, itemPerPage);
			returnValue.setSuccess();
			returnValue.setReturnData(page);
		} catch (Exception e) {
			// TODO: handle exception
			returnValue.setError();
		}
		return returnValue;
	}


	@Override
	@Transactional
	public ReturnValue queryCarsData(Map<String, String> conditions) {
		// TODO Auto-generated method stub
		ReturnValue returnValue = new ReturnValue();
		
		try {
			Page<Car> page = dao.queryCars(conditions);
			returnValue.setSuccess();
			returnValue.setReturnData(page);
		} catch (Exception e) {
			// TODO: handle exception
			returnValue.setError();
		}
		return returnValue;
	}


	@Override
	@Transactional
	public String importCars(MultipartFile mFile, String path) {
		// TODO Auto-generated method stub
		String returnMsg = ReturnValueConstants.RETURN_ERROR;
		if(!mFile.isEmpty()){
			logger.info("upload user excel file");
			File file = new File(path + EXCEL_DIR);
			if(!file.exists()){
				file.mkdirs();
			}
			String filePath = path + EXCEL_DIR + CAR_EXCEL_FILE;
			try{
				InputStream is = mFile.getInputStream();
				FileUtil.saveFile(is, filePath);
				returnMsg = ReturnValueConstants.RETURN_SUCCESS;
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
			
		}else{
			returnMsg = ReturnValueConstants.RETURN_ERROR;
		}
		return returnMsg;
	}


}
