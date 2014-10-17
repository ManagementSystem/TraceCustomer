package com.successfactors.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.successfactors.bean.Car;
import com.successfactors.bean.Page;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.CarDAO;


@Repository
public class CarDAOImpl extends BaseDAO<Car, Long> implements CarDAO{

	@Override
	public Page<Car> getCar(int currentPage, int itemPerPage) {
		// TODO Auto-generated method stub
		String hql = "from Car";
		Query query = getSession().createQuery(hql);
		query.setFirstResult((currentPage - 1) * itemPerPage);
		query.setMaxResults(itemPerPage);
		List<Car> list = query.list();
		Page<Car> page = new Page<Car>();
		page.setItem(list);
		page.setItemsPerPage(itemPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(getCount());
		return page;
		
	}
	
}
