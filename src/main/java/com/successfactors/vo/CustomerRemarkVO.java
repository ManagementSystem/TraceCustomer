package com.successfactors.vo;

import java.util.Date;

public class CustomerRemarkVO {
	private Long id;
	
	private String type;
	
	private String content;
	
	private Date updateTime;
	
	private Long customerId;
	
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

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getRemarkMan() {
		return remarkMan;
	}

	public void setRemarkMan(String remarkMan) {
		this.remarkMan = remarkMan;
	}
	
	
}
