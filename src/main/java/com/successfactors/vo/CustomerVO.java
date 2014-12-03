package com.successfactors.vo;

import java.util.Date;
import java.util.List;

import com.successfactors.bean.Customer;

public class CustomerVO {
	
	private String name;
	
	private String phone;
	
	private String region;
	
	private String budgetRange;
	
	private String carColor;
	
	private String decoration;
	
	private Integer installment;
	
	private Integer insurance;
	
	private String level;
	
	private String ispublic;
	
	private Date importTime;
	
	private Integer deadline;
	
	private String customerType;
	
	private Long carTypeId;
	
	private String sex;
	
	private String importName;
	
	private List<Long> remarkids;

	private String configuration;
	
	private Integer isTop;
	
	private String carTypeRecord;
	
	private String city;
	
	private String company;
	
	public String getCarTypeRecord() {
		return carTypeRecord;
	}

	public void setCarTypeRecord(String carTypeRecord) {
		this.carTypeRecord = carTypeRecord;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getBudgetRange() {
		return budgetRange;
	}

	public void setBudgetRange(String budgetRange) {
		this.budgetRange = budgetRange;
	}

	public String getCarColor() {
		return carColor;
	}

	public void setCarColor(String carColor) {
		this.carColor = carColor;
	}

	public String getDecoration() {
		return decoration;
	}

	public void setDecoration(String decoration) {
		this.decoration = decoration;
	}

	public Integer getInstallment() {
		return installment;
	}

	public void setInstallment(Integer installment) {
		this.installment = installment;
	}

	public Integer getInsurance() {
		return insurance;
	}

	public void setInsurance(Integer insurance) {
		this.insurance = insurance;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getIspublic() {
		return ispublic;
	}

	public void setIspublic(String ispublic) {
		this.ispublic = ispublic;
	}

	public Date getImportTime() {
		return importTime;
	}

	public void setImportTime(Date importTime) {
		this.importTime = importTime;
	}

	public Integer getDeadline() {
		return deadline;
	}

	public void setDeadline(Integer deadline) {
		this.deadline = deadline;
	}

	public String getCustomerType() {
		return customerType;
	}

	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}
	
	public Long getCarTypeId() {
		return carTypeId;
	}

	public void setCarTypeId(Long carTypeId) {
		this.carTypeId = carTypeId;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public List<Long> getRemarkids() {
		return remarkids;
	}

	public void setRemarkids(List<Long> remarkids) {
		this.remarkids = remarkids;
	}

	public String getImportName() {
		return importName;
	}

	public void setImportName(String importName) {
		this.importName = importName;
	}

	public String getConfiguration() {
		return configuration;
	}

	public void setConfiguration(String configuration) {
		this.configuration = configuration;
	}

	public Integer getIsTop() {
		return isTop;
	}

	public void setIsTop(Integer isTop) {
		this.isTop = isTop;
	}
	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setCustomersToCarGroup(Customer customer){
		this.isTop = customer.getIsTop();
		this.carTypeRecord = customer.getCarTypeRecord();
		this.budgetRange = customer.getBudgetRange();
		this.carColor = customer.getCarColor();
		this.decoration = customer.getDecoration();
		this.configuration = customer.getConfiguration();
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}
	
}
