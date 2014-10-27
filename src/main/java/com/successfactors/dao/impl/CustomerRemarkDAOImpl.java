package com.successfactors.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.successfactors.bean.CarsRemarks;
import com.successfactors.bean.CustomerRemarks;
import com.successfactors.bean.Page;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.CustomerRemarkDAO;


@Repository
public class CustomerRemarkDAOImpl extends BaseDAO<CustomerRemarks, Long> implements CustomerRemarkDAO {

	@Override
	public Page<CustomerRemarks> getRemarks(Long customerId, int currentPage,
			int itemPerPage) {
		// TODO Auto-generated method stub
		Page<CustomerRemarks> page = new Page<CustomerRemarks>();
		Criteria cCount = getSession().createCriteria(CustomerRemarks.class,
				"customerRemarks");
		cCount.add(Restrictions.eq("customerRemarks.customer.id", customerId));
		int totalResult = ((Number) cCount
				.setProjection(Projections.rowCount()).uniqueResult())
				.intValue();

		Criteria cri = getSession().createCriteria(CustomerRemarks.class,
				"customerRemarks");
		cri.add(Restrictions.eq("customerRemarks.customer.id", customerId));
		cri.setFirstResult((currentPage - 1) * itemPerPage);
		cri.setMaxResults(itemPerPage);
		List<CustomerRemarks> list = cri.list();
		page.setItem(list);
		page.setItemsPerPage(itemPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(totalResult);

		return page;
	}

}
