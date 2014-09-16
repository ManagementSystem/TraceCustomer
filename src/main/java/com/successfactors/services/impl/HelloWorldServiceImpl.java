package com.successfactors.services.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.successfactors.bean.Employee;
import com.successfactors.dao.EmployeeDAO;
import com.successfactors.services.HelloWorldService;

@Service
public class HelloWorldServiceImpl implements HelloWorldService{
	
	@Autowired
	private EmployeeDAO employeeDao;
	
	@Override
	@Transactional
	public String hello() {
		// TODO Auto-generated method stub
		Employee e = new Employee();
		e.setName("zjw");
		e.setPassword("123");
		e.setTelphone("123");
		
		employeeDao.add(e);
		
		
		
		return "Hello World";
		
	}

	public EmployeeDAO getEmployeeDao() {
		return employeeDao;
	}

	public void setEmployeeDao(EmployeeDAO employeeDao) {
		this.employeeDao = employeeDao;
	}
	
}
