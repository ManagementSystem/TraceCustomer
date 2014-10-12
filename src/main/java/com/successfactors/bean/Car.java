package com.successfactors.bean;

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


@Table(name="t_car")
@Entity
public class Car {
	
	@Id
	@Column(name = "car_id",nullable=false,unique=true)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	
	@Column(name="region",nullable=true,unique=false,length=255)
	private String region;
	
	//car type (import,Domestic,Comprehensive)
	@Column(name="type",nullable=true,unique=false,length=255)
	private String type;
	
	@Column(name="dealer",nullable=true,unique=false,length=255)
	private String dealer;
	
	
	@Column(name="principal",nullable=true,unique=false,length=255)
	private String principal;
	
	@Column(name="sale_manager",nullable=true,unique=false,length=255)
	private String saleManager;
	
	@Column(name="customer_manager",nullable=true,unique=false,length=255)
	private String customerManager;
	
	@Column(name="telphone",nullable=true,unique=false,length=255)
	private String telphone;
	
	@JoinColumn(name="cartype_id")
	@ManyToOne
	private CarType carType;
	
	@Column(name="config",nullable=true,unique=false,length=255)
	private String configuration;
	
	@Column(name="color",nullable=true,unique=false,length=255)
	private String carColor;
	
	@Column(name="decoration",nullable=true,unique=false,length=255)
	private String carDecoration;
	
	@Column(name="product_date")
	private Date productDate;

	@Column(name="sale_region",nullable=false,unique=false,length=255)
	private String sealRegion;
	
	@Column(name="price")
	private double price;
	
	@Column(name="istop")
	private Integer isTop;
	
	@OneToMany(mappedBy="car",fetch=FetchType.LAZY)
	private Set<CarsRemarks> remarks;
	
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCarColor() {
		return carColor;
	}

	public void setCarColor(String carColor) {
		this.carColor = carColor;
	}

	public String getCarDecoration() {
		return carDecoration;
	}

	public void setCarDecoration(String carDecoration) {
		this.carDecoration = carDecoration;
	}

	public String getDealer() {
		return dealer;
	}

	public void setDealer(String dealer) {
		this.dealer = dealer;
	}

	public String getTelphone() {
		return telphone;
	}

	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}

	public String getPrincipal() {
		return principal;
	}

	public void setPrincipal(String principal) {
		this.principal = principal;
	}

	public Date getProductDate() {
		return productDate;
	}

	public void setProductDate(Date productDate) {
		this.productDate = productDate;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getSaleManager() {
		return saleManager;
	}

	public void setSaleManager(String saleManager) {
		this.saleManager = saleManager;
	}

	public String getCustomerManager() {
		return customerManager;
	}

	public void setCustomerManager(String customerManager) {
		this.customerManager = customerManager;
	}

	public String getConfiguration() {
		return configuration;
	}

	public void setConfiguration(String configuration) {
		this.configuration = configuration;
	}

	public String getSealRegion() {
		return sealRegion;
	}

	public void setSealRegion(String sealRegion) {
		this.sealRegion = sealRegion;
	}

	public Integer getIsTop() {
		return isTop;
	}

	public void setIsTop(Integer isTop) {
		this.isTop = isTop;
	}

	
}
