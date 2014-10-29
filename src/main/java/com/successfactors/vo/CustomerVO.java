package com.successfactors.vo;

import java.util.Date;
import java.util.List;

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
	
	private Integer ispublic;
	
	private Date importTime;
	
	private Integer deadline;
	
	private Integer customerType;
	
	private Long carTypeId;
	
	private String sex;
	
	private Integer property;
	
	private String importName;
	
	private List<Long> remarkids;

	private String configuration;
	
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

	public Integer getIspublic() {
		return ispublic;
	}

	public void setIspublic(Integer ispublic) {
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

	public Integer getCustomerType() {
		return customerType;
	}

	public void setCustomerType(Integer customerType) {
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

	public Integer getProperty() {
		return property;
	}

	public void setProperty(Integer property) {
		this.property = property;
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
	
	
}
