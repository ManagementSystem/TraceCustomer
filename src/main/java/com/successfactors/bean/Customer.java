package com.successfactors.bean;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.successfactors.vo.CustomerVO;


@Table(name="t_customer")
@Entity
public class Customer{
	
	@Id
	@Column(name="cusotmer_id",nullable=true,unique=true)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="name",nullable=true,unique=false,length=255)
	private String name;
	
	@Column(name="phone",nullable=false,unique=false,length=255)
	private String phone;
	
	@Column(name="region",nullable=false,unique=false,length=255)
	private String region;
	
	@Column(name="budget_range",nullable=false,unique=false,length=255)
	private String budgetRange;
	
	@Column(name="car_color",nullable=false,unique=false,length=255)
	private String carColor;
	
	@Column(name="decoration",nullable=false,unique=false,length=255)
	private String decoration;
	
	@Column(name="installment",nullable=false,unique=false)
	private Integer installment;
	
	@Column(name="insurance",nullable=false,unique=false)
	private Integer insurance;
	
	@Column(name="customer_level",nullable=false,unique=false,length=255)
	private String level;
	
	@Column(name="ispublic",nullable=false,unique=false)
	private Integer ispublic;
	
	@Column(name="import_time",nullable=false,unique=false)
	private Date importTime;
	
	@Column(name="deadline",nullable=false,unique=false)
	private Integer deadline;
	
	@Column(name="customer_type",nullable=false,unique=false)
	private Integer customerType;

	@JsonIgnore
	@JoinColumn(name="cartype_id")
	@ManyToOne
	private CarType carType;
	
	
	//导入的人
	@Column(name="import_name",nullable=false,unique=false)
	private String importName;
	
	@Column(name="sex",nullable=false,unique=false,length=20)
	private String sex;
	
	
	@Column(name="property",nullable=false,unique=false)
	private Integer property; // (Derect customer or channel customer)
	
	@OneToMany(fetch=FetchType.LAZY,mappedBy="customer")
	private Set<CustomerRemarks> remarks;
	
	
	public Set<CustomerRemarks> getRemarks() {
		return remarks;
	}

	public void setRemarks(Set<CustomerRemarks> remarks) {
		this.remarks = remarks;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public CarType getCarType() {
		return carType;
	}

	public void setCarType(CarType carType) {
		this.carType = carType;
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
	
	public String getImportName() {
		return importName;
	}

	public void setImportName(String importName) {
		this.importName = importName;
	}

	public void setCustomerVO(CustomerVO vo){
		this.budgetRange = vo.getBudgetRange();
		this.carColor = vo.getCarColor();
		this.customerType = vo.getCustomerType();
		this.deadline = vo.getDeadline();
		this.decoration = vo.getDecoration();
		this.importTime = vo.getImportTime();
		this.installment = vo.getInstallment();
		this.insurance = vo.getInsurance();
		this.ispublic = vo.getIspublic();
		this.level = vo.getLevel();
		this.name = vo.getName();
		this.phone = vo.getPhone();
		this.property = vo.getProperty();
		this.region = vo.getRegion();
		this.importName = vo.getImportName();
		this.sex = vo.getSex();
	}
}
