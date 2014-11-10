package com.successfactors.services;

import java.util.Date;

import com.successfactors.bean.Page;
import com.successfactors.bean.Report;



public interface ReportService {
	
	public Page<Report> getReport(Date startDate,Date endDate,int currentPage,int itemsPerPage);
	
	public void generateReport();
	
}
