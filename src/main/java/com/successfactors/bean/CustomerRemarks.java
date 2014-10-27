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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.successfactors.vo.CustomerRemarkVO;
import com.successfactors.vo.CustomerVO;


@Entity
@Table(name="customer_remarks")
public class CustomerRemarks {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="customer_remarks_id",nullable=false,unique=true)
	private Long id;
	
	
	@Column(name="updateTime")
	private Date updateTime;
	
	@Column(name="type",nullable=true,unique=false,length=255)
	private String type;
	
	@Column(name="content",nullable=true,unique=false,length=255)
	private String content;

	@Column(name="remark_man",nullable=true,unique=false,length=255)
	private String remarkMan;
	
	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="cusotmer_id")
	private Customer customer;
	
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

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	public void setVO(CustomerRemarkVO vo){
		this.content = vo.getContent();
		this.remarkMan = vo.getRemarkMan();
		this.type = vo.getType();
	}
	
}
