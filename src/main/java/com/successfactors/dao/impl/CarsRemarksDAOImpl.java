package com.successfactors.dao.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.successfactors.bean.CarsRemarks;
import com.successfactors.bean.Page;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.CarsRemarksDAO;

@Repository
public class CarsRemarksDAOImpl extends BaseDAO<CarsRemarks, Long> implements
		CarsRemarksDAO {

	Logger logger = Logger.getLogger(CarsRemarksDAOImpl.class);

	@Override
	public Page<CarsRemarks> getRemarks(Long carId, int currentPage,
			int itemPerPage) {
		// TODO Auto-generated method stub
		Page<CarsRemarks> page = new Page<CarsRemarks>();
		Criteria cCount = getSession().createCriteria(CarsRemarks.class,
				"carRemark");
		cCount.add(Restrictions.eq("carRemark.car.id", carId));
		int totalResult = ((Number) cCount
				.setProjection(Projections.rowCount()).uniqueResult())
				.intValue();

		Criteria cri = getSession().createCriteria(CarsRemarks.class,
				"carRemark");
		cri.add(Restrictions.eq("carRemark.car.id", carId));
		cri.addOrder(Order.desc("updateTime"));
		cri.setFirstResult((currentPage - 1) * itemPerPage);
		cri.setMaxResults(itemPerPage);
		List<CarsRemarks> list = cri.list();
		page.setItem(list);
		page.setItemsPerPage(itemPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(totalResult);

		return page;
	}

}
