package com.successfactors.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="t_employee")
public class Employee {
	@Id
	@GeneratedValue
	@Column(name = "e_id")
	private Integer employeeId;
	@Column(name = "e_name")
	private String name;
	@Column(name = "e_telphone")
	private String telphone;
	@Column(name = "e_password")
	private String password;
	
	public String getTelphone() {
		return telphone;
	}
	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
