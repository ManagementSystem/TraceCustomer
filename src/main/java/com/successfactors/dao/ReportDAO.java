package com.successfactors.dao;

import java.util.Date;

import com.successfactors.bean.Page;
import com.successfactors.bean.Report;

public interface ReportDAO extends GenericDAO<Report, Long>{
	
	public Page<Report> getReports(Date startDate, Date endDate,int currentPage,int itemsPerPage);
}
