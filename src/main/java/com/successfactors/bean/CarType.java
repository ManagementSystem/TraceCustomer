package com.successfactors.bean;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Table(name="t_cartype")
@Entity
public class CarType {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="cartype_id",nullable=false,unique=true)
	private Long id;
	
	@Column(name="brand",nullable=true,unique=false,length=255)
	private String brand;
	
	@Column(name="type",nullable=true,unique=false,length=255)
	private String type;

	@OneToMany(fetch = FetchType.LAZY,mappedBy = "carType")
	private Set<Customer> customers; 
	
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "carType")
	private Set<Car> cars;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<Car> getCars() {
		return cars;
	}

	public void setCars(Set<Car> cars) {
		this.cars = cars;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Set<Customer> getCustomers() {
		return customers;
	}

	public void setCustomers(Set<Customer> customers) {
		this.customers = customers;
	}
	
	
}
