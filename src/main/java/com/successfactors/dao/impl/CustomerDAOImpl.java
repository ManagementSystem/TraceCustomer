package com.successfactors.dao.impl;



import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.successfactors.bean.Customer;
import com.successfactors.bean.Page;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.CustomerDAO;


@Repository
public class CustomerDAOImpl extends BaseDAO<Customer, String> implements CustomerDAO{

	@Override
	public Page<Customer> getCustomers(int currentPage, int itemPerPage) {
		
		// TODO Auto-generated method stub
		String hql = "from Customer";
		Query query = getSession().createQuery(hql);
		query.setFirstResult((currentPage - 1) * itemPerPage + 1);
		query.setMaxResults(itemPerPage);
		List<Customer> list = query.list();
		Page<Customer> page = new Page<Customer>();
		page.setItem(list);
		page.setItemsPerPage(itemPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(getCount());
		return page;
	}

}
