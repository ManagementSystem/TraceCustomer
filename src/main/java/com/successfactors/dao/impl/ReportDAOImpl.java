package com.successfactors.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.successfactors.bean.Page;
import com.successfactors.bean.Report;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.ReportDAO;
import com.successfactors.vo.ReportReturnVO;


@Repository
public class ReportDAOImpl extends BaseDAO<Report, Long> implements ReportDAO{

	@Override
	public Page<ReportReturnVO> getReports(Date startDate, Date endDate,
			int currentPage, int itemsPerPage) {
		// TODO Auto-generated method stub
		Page<ReportReturnVO> page = new Page<ReportReturnVO>();
		Criteria c = getSession().createCriteria(Report.class);
		c.add(Restrictions.between("date", startDate, endDate));
		Integer totalResult = getCount(null, Restrictions.between("date", startDate, endDate));
		c.setFirstResult((currentPage - 1) * itemsPerPage);
		c.setMaxResults(itemsPerPage);
		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("id"));
		proList.add(Projections.groupProperty("name"));
		proList.add(Projections.sum("dealCount"), "sumDealCount");
		proList.add(Projections.sum("addCount"), "sumAddCount");
		proList.add(Projections.sum("remarkCount"), "sumRemarkCount");
		proList.add(Projections.sum("topCount"), "sumTopCount");
		proList.add(Projections.property("group"));
		proList.add(Projections.property("date"));
		c.setProjection(proList);
		List<Object[]> list = c.list();
		List<ReportReturnVO> returnVOs = new ArrayList<>();
		for (Object[] obj : list) {
			ReportReturnVO vo = new ReportReturnVO();
			vo.setId(Long.valueOf(obj[0].toString()));
			vo.setName(obj[1].toString());
			vo.setDealCount(Integer.valueOf(obj[2].toString()));
			vo.setAddCount(Integer.valueOf(obj[3].toString()));
			vo.setRemarkCount(Integer.valueOf(obj[4].toString()));
			vo.setTopCount(Integer.valueOf(obj[5].toString()));
			vo.setGroup(obj[6].toString());
			vo.setDate(obj[7].toString());
			returnVOs.add(vo);
		}
		page.setItem(returnVOs);
		page.setItemsPerPage(itemsPerPage);
		page.setCurrentPage(currentPage);
		page.setTotalItems(totalResult);
		return page;
	}
	
	
}
