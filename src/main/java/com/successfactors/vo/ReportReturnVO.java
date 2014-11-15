package com.successfactors.vo;


public class ReportReturnVO {
	private Long id;
	private String name;
	private String group;
	private String date;
	private Integer dealCount;
	private Integer addCount;
	private Integer remarkCount;
	private Integer topCount;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getDealCount() {
		return dealCount;
	}
	public void setDealCount(Integer dealCount) {
		this.dealCount = dealCount;
	}
	public Integer getAddCount() {
		return addCount;
	}
	public void setAddCount(Integer addCount) {
		this.addCount = addCount;
	}
	public Integer getRemarkCount() {
		return remarkCount;
	}
	public void setRemarkCount(Integer remarkCount) {
		this.remarkCount = remarkCount;
	}
	public Integer getTopCount() {
		return topCount;
	}
	public void setTopCount(Integer topCount) {
		this.topCount = topCount;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
}
