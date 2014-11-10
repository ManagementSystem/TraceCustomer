package com.successfactors.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.successfactors.bean.Page;
import com.successfactors.bean.Report;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.ReportDAO;


@Repository
public class ReportDAOImpl extends BaseDAO<Report, Long> implements ReportDAO{

	@Override
	public Page<Report> getReports(Date startDate, Date endDate,
			int currentPage, int itemsPerPage) {
		// TODO Auto-generated method stub
		Page<Report> page = new Page<Report>();
		Criteria c = getSession().createCriteria(Report.class);
		c.add(Restrictions.between("date", startDate, endDate));
		Integer totalResult = getCount(null, Restrictions.between("date", startDate, endDate));
		c.setFirstResult((currentPage - 1) * itemsPerPage);
		c.setMaxResults(itemsPerPage);
		List<Report> list = c.list();
		page.setItem(list);
		page.setItemsPerPage(itemsPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(totalResult);
		return page;
	}
	
	
}
