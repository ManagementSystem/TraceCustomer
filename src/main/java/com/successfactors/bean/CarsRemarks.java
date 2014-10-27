package com.successfactors.bean;

import java.util.Date;

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
import com.successfactors.vo.CarRemarkVO;

@Entity
@Table(name="cars_remarks")
public class CarsRemarks {
	
	@Id
	@Column(name="car_remark_id",nullable=false,unique=true)
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="type",nullable=true,unique=false,length=255)
	private String type;
	
	@Column(name="content",nullable=true,unique=false,length=255)
	private String content;
	
	@Column(name="update_time")
	private Date updateTime;
	
	@Column(name="remarkman",nullable=true,unique=false,length=255)
	private String remarkMan;
	
	@JsonIgnore
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="car_id")
	private Car car;

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
	
	public String getRemarkMan() {
		return remarkMan;
	}

	public void setRemarkMan(String remarkMan) {
		this.remarkMan = remarkMan;
	}

	public Car getCar() {
		return car;
	}

	public void setCar(Car car) {
		this.car = car;
	}

	public void setVO(CarRemarkVO vo){
		this.content = vo.getContent();
		this.remarkMan = vo.getRemarkMan();
		this.type = vo.getType();
	}
	
}
