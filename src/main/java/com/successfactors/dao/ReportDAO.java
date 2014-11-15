package com.successfactors.dao;

import java.util.Date;

import com.successfactors.bean.Page;
import com.successfactors.bean.Report;
import com.successfactors.vo.ReportReturnVO;

public interface ReportDAO extends GenericDAO<Report, Long>{
	
	public Page<ReportReturnVO> getReports(Date startDate, Date endDate,int currentPage,int itemsPerPage);
}
