package com.successfactors.bean;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Table(name="t_cartype")
@Entity
public class CarType {
	
	@Id
	@GeneratedValue
	@Column(name="cartype_id")
	private String id;
	
	@Column(name="brand")
	private String brand;
	
	@Column(name="type")
	private String type;

	@OneToMany(mappedBy = "carTpye")
	private Set<Customer> customers; 
	
	
	@OneToMany(mappedBy = "carType")
	private Set<Car> cars;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
