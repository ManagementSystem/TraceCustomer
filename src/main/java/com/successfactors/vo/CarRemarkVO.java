package com.successfactors.vo;

import java.util.Date;

public class CarRemarkVO {
	private Long id;
	
	private String type;
	
	private String content;
	
	private Date updateTime;
	
	private Long carId;
	
	private String remarkMan;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Long getCarId() {
		return carId;
	}

	public void setCarId(Long carId) {
		this.carId = carId;
	}

	public String getRemarkMan() {
		return remarkMan;
	}

	public void setRemarkMan(String remarkMan) {
		this.remarkMan = remarkMan;
	}
	
	
}
