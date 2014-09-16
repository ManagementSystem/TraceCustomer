package com.successfactors.dao.impl;

import org.springframework.stereotype.Repository;

import com.successfactors.bean.Employee;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.EmployeeDAO;

@Repository
public class EmployeeDAOImpl extends BaseDAO<Employee, Integer> implements EmployeeDAO{
	
}
