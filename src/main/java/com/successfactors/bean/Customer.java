package com.successfactors.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.context.annotation.Lazy;


@Table(name="t_customer")
@Entity
public class Customer {
	
	@Id
	@Column(name="c_id")
	@GeneratedValue
	private String id;
	
	@Column(name="c_name")
	private String name;
	
	@Column(name="c_phone")
	private String phone;
	
	@Column(name="region")
	private String region;
	
	@Column(name="budget_range")
	private String budgetRange;
	
	@Column(name="car_color")
	private String carColor;
	
	@Column(name="decoration")
	private String decoration;
	
	@Column(name="installment")
	private Integer installment;
	
	@Column(name="insurance")
	private Integer insurance;
	
	@Column(name="c_level")
	private String level;
	
	@Column(name="ispublic")
	private Integer ispublic;
	
	@Column(name="import_time")
	private Date importTime;
	
	@Column(name="deadline")
	private Integer deadline;
	
	@Column(name="customer_type")
	private Integer customerType;

	@ManyToOne
	@JoinColumn(name="car_type")
	private CarType carTpye;
	
	@Column(name="c_sex")
	private String sex;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public CarType getCarTpye() {
		return carTpye;
	}

	public void setCarTpye(CarType carTpye) {
		this.carTpye = carTpye;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
	
}
