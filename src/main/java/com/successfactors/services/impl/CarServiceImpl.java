package com.successfactors.services.impl;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
import com.successfactors.util.ReadExcelUtil;
import com.successfactors.vo.CarVO;


@Service
public class CarServiceImpl implements CarService{

	@Autowired
	private CarDAO dao;
	
	
	@Autowired
	private CarTypeDAO carTypeDao;
	
	private static Logger logger = Logger.getLogger(CarServiceImpl.class);
	
	
	private static final String EXCEL_DIR = File.separator + "excel" + File.separator;
	
	private static final String CAR_EXCEL_FILE = "car_import";
	
	private static final String CAR_CHANNEL_FILE = "carchannel_import";
	
	@Override
	@Transactional
	public String addCar(CarVO carVO) {
		// TODO Auto-generated method stub
		try{
			CarType carType = carTypeDao.findById(carVO.getCarTypeId());
			Car car = new Car();
			car.setCarVO(carVO);
			car.setCarType(carType);
			car.setCarTypeRecord(carType.getBrand() + carType.getType());
			car.setImportTime(new Date());
			car.setDelFlag(0);
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


	/*@Override
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
	}*/


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
	public String importCars(MultipartFile mFile, String path,String suffix,String operator) {
		// TODO Auto-generated method stub
		String returnMsg = ReturnValueConstants.RETURN_ERROR;
		if(!mFile.isEmpty()){
			logger.info("upload car excel file");
			File file = new File(path + EXCEL_DIR);
			if(!file.exists()){
				file.mkdirs();
			}
			String filePath = path + EXCEL_DIR + CAR_EXCEL_FILE + ".xls";
			try{
				InputStream is = mFile.getInputStream();
				FileUtil.saveFile(is, filePath);
				List<Car> cars = ReadExcelUtil.readCars(filePath,operator);
				dao.add(cars);
				returnMsg = ReturnValueConstants.RETURN_SUCCESS;
			}catch(Exception ex){
				logger.error(ex.getMessage());
				returnMsg = ReturnValueConstants.RETURN_ERROR;
			}
			
		}else{
			returnMsg = ReturnValueConstants.RETURN_ERROR;
		}
		return returnMsg;
	}


	@Override
	@Transactional
	public ReturnValue getCarsDataToCustomer(Map<String, String> conditions) {
		// TODO Auto-generated method stub
		ReturnValue returnValue = new ReturnValue();
		try {
			Page<Car> page = dao.getCars(conditions);
			Page<CarVO> pageVO = convertCarsToCustomer(page);
			returnValue.setSuccess();
			returnValue.setReturnData(pageVO);
		} catch (Exception e) {
			// TODO: handle exception
			returnValue.setError();
		}
		return returnValue;
	}

	private Page<CarVO> convertCarsToCustomer(Page<Car> page){
		Page<CarVO> pageVO = new Page<>();
		List<CarVO> list = new ArrayList<>();
		
		for (Car car : page.getItem()) {
			CarVO carvo = new CarVO();
			carvo.setCarsToCustomerGroup(car);
			list.add(carvo);
		}
		pageVO.setItem(list);
		pageVO.setCurrentPage(page.getCurrentPage());
		pageVO.setItemsPerPage(page.getItemsPerPage());
		pageVO.setTotalItems(page.getTotalItems());
		return pageVO;
	}

	@Override
	@Transactional
	public ReturnValue getCars(Map<String, String> conditions) {
		// TODO Auto-generated method stub
		ReturnValue returnValue = new ReturnValue();
		try{
			Page<Car> page = dao.getCars(conditions);
			returnValue.setSuccess();
			returnValue.setReturnData(page);
		}catch(Exception ex){
			returnValue.setError();
		}
		return returnValue;
	}


	@Override
	@Transactional
	public String delCar(Long id) {
		// TODO Auto-generated method stub
		try{
			Car car = dao.getById(id);
			if(car != null){
				car.setDelFlag(1);
				dao.save(car);
			}
		}catch(Exception ex){
			logger.error(ex.getMessage());
			return ReturnValueConstants.RETURN_ERROR;
		}
		return ReturnValueConstants.RETURN_SUCCESS;
	}


	@Override
	@Transactional
	public String updateCar(Car car) {
		// TODO Auto-generated method stub
		
		if(car.getId() == null){
			return ReturnValueConstants.RETURN_ERROR;
		}
		try {
			dao.update(car);
		} catch (Exception e) {
			// TODO: handle exception
			logger.error(e.getMessage());
			return ReturnValueConstants.RETURN_ERROR;
		}
		return ReturnValueConstants.RETURN_SUCCESS;
	}


	@Override
	@Transactional
	public String importChannelCars(MultipartFile mFile, String path,
			String suffix, String operator) {
		// TODO Auto-generated method stub
		String returnMsg = ReturnValueConstants.RETURN_ERROR;
		if(!mFile.isEmpty()){
			logger.info("upload channel car excel file");
			File file = new File(path + EXCEL_DIR);
			if(!file.exists()){
				file.mkdirs();
			}
			String filePath = path + EXCEL_DIR + CAR_CHANNEL_FILE + ".xls";
			try{
				InputStream is = mFile.getInputStream();
				FileUtil.saveFile(is, filePath);
				List<Car> cars = ReadExcelUtil.readChannelCars(filePath,operator);
				dao.add(cars);
				returnMsg = ReturnValueConstants.RETURN_SUCCESS;
			}catch(Exception ex){
				logger.error(ex.getMessage());
				returnMsg = ReturnValueConstants.RETURN_ERROR;
			}
			
		}else{
			returnMsg = ReturnValueConstants.RETURN_ERROR;
		}
		return returnMsg;
	}


}
