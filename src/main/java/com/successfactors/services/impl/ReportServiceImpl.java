package com.successfactors.services.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.successfactors.bean.Report;
import com.successfactors.bean.Users;
import com.successfactors.constant.UserAuthConstants;
import com.successfactors.dao.CarDAO;
import com.successfactors.dao.CarsRemarksDAO;
import com.successfactors.dao.CustomerDAO;
import com.successfactors.dao.CustomerRemarkDAO;
import com.successfactors.dao.ReportDAO;
import com.successfactors.dao.UsersDAO;
import com.successfactors.services.ReportService;

@Service
public class ReportServiceImpl implements ReportService{

	private static final Logger logger = Logger.getLogger(ReportServiceImpl.class);
	
	@Autowired
	private ReportDAO reportDao;
	
	@Autowired
	private CarsRemarksDAO carsRemarksDao;
	
	@Autowired
	private CarDAO carDao;
	
	@Autowired
	private CustomerRemarkDAO customerRemarkDao;
	
	@Autowired
	private CustomerDAO customerDAO;
	
	@Autowired
	private UsersDAO userDao;
	
	@Override
	public List<Report> getReport(Date startDate, Date endDate) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Transactional
	@Scheduled(cron="0 0/30 1 * * ?")
	public void generateReport(){
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/YYYY");
		
		Date nowTime = new Date();
		logger.info("Start generating report ["+ sdf.format(nowTime) + "]");
		logger.info("Current time is " + nowTime.toString());
		Date startTime = dateHandler(nowTime, 1);
		List<Users> carUsers = userDao.getUsersByType(UserAuthConstants.ROLE_SUPPLY);
		List<Report> reports = new ArrayList<Report>();
		for (Users users : carUsers) {
			Report report = new Report();
			int remarkCount = carsRemarksDao.getCount(null,Restrictions.eq("remarkMan", users.getUsername()),Restrictions.between("updateTime", startTime, nowTime));
			int dealCount = carsRemarksDao.getCount(null, Restrictions.eq("remarkMan", users.getUsername()),
														  Restrictions.between("updateTime", startTime, nowTime),
														  Restrictions.eq("type", "2"));
			int addCount = carDao.getCount(null, Restrictions.eq("operator", users.getUsername()),Restrictions.between("importTime", startTime, nowTime));
			int topCount =  carDao.getCount(null, Restrictions.eq("operator", users.getUsername()),Restrictions.between("importTime", startTime, nowTime),Restrictions.eq("isTop", 1));
			report.setAddCount(addCount);
			report.setRemarkCount(remarkCount);
			report.setDate(nowTime);
			report.setName(users.getUsername());
			report.setDealCount(dealCount);
			report.setGroup("货源组");
			report.setTopCount(topCount);
			reports.add(report);
		}
		// 客户组统计
		List<Users> customerUsers = userDao.getUsersByType(UserAuthConstants.ROLE_CUSTOMER);
		
		for (Users users : customerUsers) {
			Report report = new Report();
			int remarkCount = customerRemarkDao.getCount(null,Restrictions.eq("remarkMan", users.getUsername()),Restrictions.between("updateTime", startTime, nowTime));
			int dealCount = customerRemarkDao.getCount(null, Restrictions.eq("remarkMan", users.getUsername()),
														  Restrictions.between("updateTime", startTime, nowTime),
														  Restrictions.eq("type", "2"));
			int addCount = customerDAO.getCount(null, Restrictions.eq("importName", users.getUsername()),Restrictions.between("importTime", startTime, nowTime));
			int topCount =  customerDAO.getCount(null, Restrictions.eq("importName", users.getUsername()),Restrictions.between("importTime", startTime, nowTime),Restrictions.eq("isTop", 1));
			report.setAddCount(addCount);
			report.setRemarkCount(remarkCount);
			report.setDate(nowTime);
			report.setName(users.getUsername());
			report.setDealCount(dealCount);
			report.setGroup("客户组");
			report.setTopCount(topCount);
			reports.add(report);
		}
		reportDao.add(reports);
	}
	
	private Date dateHandler(Date nowDate,int beforeTime){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(nowDate);
		calendar.set(Calendar.DATE, calendar.get(Calendar.DATE) - beforeTime);
		return calendar.getTime();
	}
}
