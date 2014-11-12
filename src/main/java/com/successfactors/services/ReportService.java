package com.successfactors.services;

import java.util.Date;

import com.successfactors.bean.Page;
import com.successfactors.bean.Report;
import com.successfactors.bean.ReturnValue;



public interface ReportService {
	
	public ReturnValue getReport(Date startDate,Date endDate,int currentPage,int itemsPerPage);
	
	public void generateReport();
	
}
