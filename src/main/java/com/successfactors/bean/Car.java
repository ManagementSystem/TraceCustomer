package com.successfactors.bean;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Table(name="t_car")
@Entity
public class Car {
	
	@Id
	@Column(name = "car_id")
	@GeneratedValue
	private String id;
	
	@JoinColumn(name="cartype_id")
	@ManyToOne
	private CarType carType;
	
	@Column(name="price")
	private double price;
	
	@Column(name="car_color")
	private String carColor;
	
	@Column(name="car_decoration")
	private String carDecoration;
	
	@Column(name="dealer")
	private String dealer;
	
	@Column(name="telphone")
	private String telphone;
	
	@Column(name="principal")
	private String principal;
	
	@Column(name="product_date")
	private Date productDate;
	
	@Column(name="seal_region")
	private String sealRegion;
}
