package com.successfactors.dao.impl;

import org.springframework.stereotype.Repository;

import com.successfactors.bean.CarType;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.CarTypeDAO;

@Repository
public class CarTypeDAOImpl extends BaseDAO<CarType, Long> implements CarTypeDAO{

}
