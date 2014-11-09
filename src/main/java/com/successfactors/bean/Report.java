package com.successfactors.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Table(name="t_report")
@Entity
public class Report {
	
	@Id
	@Column(name="r_id",nullable=false,unique=true)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="r_name",nullable=false,unique=false)
	private String name;
	
	@Column(name="r_group",nullable=false,unique= false)
	private String group;

	@Column(name="remark_count")
	private Integer remarkCount;
	
	@Column(name="top_count")
	private Integer topCount;
	
	@Column(name="add_count")
	private Integer addCount;
	
	@Column(name="deal_count")
	private Integer dealCount;
	
	@Column(name="r_date")
	private Date date;

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

	public Integer getAddCount() {
		return addCount;
	}

	public void setAddCount(Integer addCount) {
		this.addCount = addCount;
	}

	public Integer getDealCount() {
		return dealCount;
	}

	public void setDealCount(Integer dealCount) {
		this.dealCount = dealCount;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}
	
	
	
	
	
}
