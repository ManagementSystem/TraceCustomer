package com.successfactors.dao.impl;

import org.springframework.stereotype.Repository;

import com.successfactors.bean.Car;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.CarDAO;


@Repository
public class CarDAOImpl extends BaseDAO<Car, Long> implements CarDAO{
	
}
