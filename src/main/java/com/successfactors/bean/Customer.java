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
	
	@Column(name="name",nullable=false,unique=false,length=255)
	private String name;
	
	@Column(name="phone",nullable=true,unique=false,length=255)
	private String phone;
	
	@Column(name="region",nullable=true,unique=false,length=255)
	private String region;
	
	@Column(name="budget_range",nullable=true,unique=false,length=255)
	private String budgetRange;
	
	@Column(name="car_color",nullable=true,unique=false,length=255)
	private String carColor;
	
	@Column(name="decoration",nullable=true,unique=false,length=255)
	private String decoration;
	
	@Column(name="installment",nullable=true,unique=false)
	private Integer installment;
	
	@Column(name="insurance",nullable=true,unique=false)
	private Integer insurance;
	
	@Column(name="customer_level",nullable=true,unique=false,length=255)
	private String level;
	
	@Column(name="ispublic",nullable=true,unique=false)
	private String ispublic;
	
	@Column(name="import_time",nullable=true,unique=false)
	private Date importTime;
	
	@Column(name="deadline",nullable=true,unique=false)
	private Integer deadline;
	
	@Column(name="customer_type",nullable=true,unique=false)
	private String customerType;
	
	@Column(name="config",nullable=true,unique=false,length=255)
	private String configuration;
	
	@JsonIgnore
	@JoinColumn(name="cartype_id")
	@ManyToOne
	private CarType carType;
	
	@Column(name="cartype_record",nullable=true,unique=false,length=255)
	private String carTypeRecord;
	
	//导入的人
	@Column(name="import_name",nullable=true,unique=false)
	private String importName;
	
	@Column(name="sex",nullable=true,unique=false,length=20)
	private String sex;
	
	@Column(name="deal_count",nullable=true,unique=false)
	private Integer dealCount;
	
	@Column(name="istop",nullable=true,unique=false)
	private Integer isTop;
	
	@JsonIgnore
	@OneToMany(fetch=FetchType.LAZY,mappedBy="customer")
	private Set<CustomerRemarks> remarks;
	
	@Column(name="del_flag",nullable=false)
	private Integer delFlag;
	
	@Column(name="city",nullable=true,unique=false,length=255)
	private String city;
	
	@Column(name="company",nullable=true,unique=false,length=255)
	private String company;
	
	@Column(name="last_modify")
	private Date lastModifyTime;
	
	
	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

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

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
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

	public String getCarTypeRecord() {
		return carTypeRecord;
	}

	public void setCarTypeRecord(String carTypeRecord) {
		this.carTypeRecord = carTypeRecord;
	}

	public Integer getDealCount() {
		return dealCount;
	}

	public void setDealCount(Integer dealCount) {
		this.dealCount = dealCount;
	}

	public Integer getIsTop() {
		return isTop;
	}

	public void setIsTop(Integer isTop) {
		this.isTop = isTop;
	}
	
	public Integer getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}

	
	
	public Date getLastModifyTime() {
		return lastModifyTime;
	}

	public void setLastModifyTime(Date lastModifyTime) {
		this.lastModifyTime = lastModifyTime;
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
		this.region = vo.getRegion();
		this.importName = vo.getImportName();
		this.sex = vo.getSex();
		this.configuration = vo.getConfiguration();
		this.isTop = vo.getIsTop();
		this.city = vo.getCity();
		this.company = vo.getCompany();
	}
	
	public void setCustomersToCarGroup(){
		this.carType = null;
		this.customerType = "";
		this.importName = "";
		this.installment = null;
		this.insurance = null;
		this.level = "";
		this.name = "";
		this.sex = "";
		this.phone = "";
		this.region = "";
		this.remarks = null;
		this.city = "";
	}
}
