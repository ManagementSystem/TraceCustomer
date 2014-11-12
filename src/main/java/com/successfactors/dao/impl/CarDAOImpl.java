package com.successfactors.dao.impl;

import java.util.List;
import java.util.Map;

import javax.servlet.jsp.jstl.core.Config;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.successfactors.bean.Car;
import com.successfactors.bean.CarsRemarks;
import com.successfactors.bean.Page;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.CarDAO;


@Repository
public class CarDAOImpl extends BaseDAO<Car, Long> implements CarDAO{
	
	Logger logger = Logger.getLogger(CarDAOImpl.class);

	@Override
	public Page<Car> getCar(int currentPage, int itemPerPage) {
		// TODO Auto-generated method stub
		String hql = "from Car c order by c.price asc";
		Query query = getSession().createQuery(hql);
		query.setFirstResult((currentPage - 1) * itemPerPage);
		query.setMaxResults(itemPerPage);
		List<Car> list = query.list();
		Page<Car> page = new Page<Car>();
		page.setItem(list);
		page.setItemsPerPage(itemPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(getCount(null));
		return page;
		
	}

	@Override
	public Page<Car> queryCars(Map<String, String> conditions) {
		// TODO Auto-generated method stub
		Page<Car> page = new Page<Car>();
		int currentPage = 0;
		int itemPerPage = 0;
		Criteria c = getSession().createCriteria(Car.class);
		Criteria countC = getSession().createCriteria(Car.class);
		for (String key : conditions.keySet()) {
			String val = conditions.get(key);
			if(key.equals("currentPage")){
				currentPage = Integer.parseInt(val);
			}else if(key.equals("itemsPerPage")){
				itemPerPage = Integer.parseInt(val);
			}else{
				if(val != null && !"".equals(val)){
					c.add(Restrictions.like(key, "%"+val+"%"));
					countC.add(Restrictions.like(key, "%"+val+"%"));
				}
			}
		}
		Integer totalResult = ((Number)countC.setProjection(Projections.rowCount()).uniqueResult()).intValue();
		c.setFirstResult((currentPage - 1) * itemPerPage);
		c.setMaxResults(itemPerPage);
		c.addOrder(Order.asc("price"));
		List<Car> list = c.list();
		page.setItem(list);
		page.setItemsPerPage(itemPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(totalResult);
		return page;
	}

	
	
}
