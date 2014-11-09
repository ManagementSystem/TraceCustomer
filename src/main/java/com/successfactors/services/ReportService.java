package com.successfactors.services;

import java.util.Date;
import java.util.List;

import com.successfactors.bean.Report;



public interface ReportService {
	
	public List<Report> getReport(Date startDate,Date endDate);
	
	public void generateReport();
	
}
