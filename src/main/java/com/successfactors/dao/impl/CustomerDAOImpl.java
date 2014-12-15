package com.successfactors.dao.impl;



import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Conjunction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.successfactors.bean.Car;
import com.successfactors.bean.Customer;
import com.successfactors.bean.Page;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.CustomerDAO;
import com.successfactors.vo.CustomerVO;


@Repository
public class CustomerDAOImpl extends BaseDAO<Customer, Long> implements CustomerDAO{

	@Override
	public Page<Customer> getCustomers(int currentPage, int itemPerPage) {
		
		// TODO Auto-generated method stub
		String hql = "from Customer";
		Query query = getSession().createQuery(hql);
		query.setFirstResult((currentPage - 1) * itemPerPage);
		query.setMaxResults(itemPerPage);
		List<Customer> list = query.list();
		Page<Customer> page = new Page<Customer>();
		page.setItem(list);
		page.setItemsPerPage(itemPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(getCount(null));
		return page;
	}

	@Override
	public Page<Customer> queryCustomer(Map<String, String> conditions,boolean publicFlag) {
		// TODO Auto-generated method stub
		Page<Customer> page = new Page<Customer>();
		int currentPage = 0;
		int itemPerPage = 0;
		Criteria c = getSession().createCriteria(Customer.class);
		Criteria countC = getSession().createCriteria(Customer.class);
		Conjunction con = Restrictions.conjunction();
		for (String key : conditions.keySet()) {
			String val = conditions.get(key);
			if(key.equals("currentPage")){
				currentPage = Integer.parseInt(val);
			}else if(key.equals("itemsPerPage")){
				itemPerPage = Integer.parseInt(val);
			}else{
				if(val != null && !"".equals(val)){
					con.add(Restrictions.like(key, "%"+val+"%"));
				}
			}
		}
		
		if(publicFlag){
			Disjunction dis = Restrictions.disjunction();
			dis.add(Restrictions.eq("ispublic", "1"));
			con.add(Restrictions.eq("ispublic", "0"));
			dis.add(con);
			Conjunction sumCon = Restrictions.conjunction();
			sumCon.add(dis);
			sumCon.add(Restrictions.eq("delFlag", 0));
			countC.add(sumCon);
			c.add(sumCon);
		}else{
			con.add(Restrictions.eq("delFlag", 0));
			c.add(con);
			countC.add(con);
		}
		c.addOrder(Order.desc("isTop"));
		c.addOrder(Order.desc("importTime"));
		c.addOrder(Order.desc("lastModifyTime"));
		Integer totalResult = ((Number)countC.setProjection(Projections.rowCount()).uniqueResult()).intValue();
		c.setFirstResult((currentPage - 1) * itemPerPage);
		c.setMaxResults(itemPerPage);
		List<Customer> list = c.list();
		page.setItem(list);
		page.setItemsPerPage(itemPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(totalResult);
		return page;
	}

	@Override
	public Page<Customer> getCustomers(Map<String, String> conditions,boolean publicFlag) {
		// TODO Auto-generated method stub
		Page<Customer> page = new Page<Customer>();
		int currentPage = 0;
		int itemPerPage = 0;
		Criteria c = getSession().createCriteria(Customer.class);
		Criteria countC = getSession().createCriteria(Customer.class);
		Conjunction con = Restrictions.conjunction();
		
		for (String key : conditions.keySet()) {
			String val = conditions.get(key);
			if(key.equals("currentPage")){
				currentPage = Integer.parseInt(val);
			}else if(key.equals("itemsPerPage")){
				itemPerPage = Integer.parseInt(val);
			}else{
				if(val != null && !"".equals(val)){
//					c.add(Restrictions.eq(key, val));
//					countC.add(Restrictions.eq(key, val));
					con.add(Restrictions.eq(key, val));
				}
			}
		}
//		con.add(Restrictions.eq("delFlag", 0));
		if(publicFlag){
			Disjunction dis = Restrictions.disjunction();
			dis.add(Restrictions.eq("ispublic", "1"));
			con.add(Restrictions.eq("ispublic", "0"));
			dis.add(con);
			Conjunction sumCon = Restrictions.conjunction();
			sumCon.add(dis);
			sumCon.add(Restrictions.eq("delFlag", 0));
			countC.add(sumCon);
			c.add(sumCon);
		}else{
			con.add(Restrictions.eq("delFlag", 0));
			c.add(con);
			countC.add(con);
		}
		Integer totalResult = ((Number)countC.setProjection(Projections.rowCount()).uniqueResult()).intValue();
		c.setFirstResult((currentPage - 1) * itemPerPage);
		c.setMaxResults(itemPerPage);
		c.addOrder(Order.desc("isTop"));
		c.addOrder(Order.desc("importTime"));
		c.addOrder(Order.desc("lastModifyTime"));
		List<Customer> list = c.list();
		page.setItem(list);
		page.setItemsPerPage(itemPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(totalResult);
		return page;
	}

	

}
