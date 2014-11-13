package com.successfactors.vo;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

public class CarVO {
	private Long id;
	
	private String region;
	
	private String type;
	
	private String dealer;
	
	private String principal;
	
	private String saleManager;
	
	private String customerManager;
	
	private String telphone;
	
	private Long carTypeId;
	
	private String configuration;
	
	private String carColor;
	
	private String carDecoration;
	
	//记得在前天加上
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date productDate;

	private String saleRegion;
	
	private double price;
	
	private Integer isTop;
	
	private String operator;
	
	private List<Long> remarkids;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getDealer() {
		return dealer;
	}

	public void setDealer(String dealer) {
		this.dealer = dealer;
	}

	public String getPrincipal() {
		return principal;
	}

	public void setPrincipal(String principal) {
		this.principal = principal;
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

	public String getTelphone() {
		return telphone;
	}

	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}

	public Long getCarTypeId() {
		return carTypeId;
	}

	public void setCarTypeId(Long carTypeId) {
		this.carTypeId = carTypeId;
	}

	public String getConfiguration() {
		return configuration;
	}

	public void setConfiguration(String configuration) {
		this.configuration = configuration;
	}

	public String getCarColor() {
		return carColor;
	}

	public void setCarColor(String carColor) {
		this.carColor = carColor;
	}

	public Date getProductDate() {
		return productDate;
	}

	public void setProductDate(Date productDate) {
		this.productDate = productDate;
	}


	public String getSaleRegion() {
		return saleRegion;
	}

	public void setSaleRegion(String saleRegion) {
		this.saleRegion = saleRegion;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Integer getIsTop() {
		return isTop;
	}

	public void setIsTop(Integer isTop) {
		this.isTop = isTop;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public List<Long> getRemarkids() {
		return remarkids;
	}

	public void setRemarkids(List<Long> remarkids) {
		this.remarkids = remarkids;
	}

	public String getCarDecoration() {
		return carDecoration;
	}

	public void setCarDecoration(String carDecoration) {
		this.carDecoration = carDecoration;
	}
	
	
}
