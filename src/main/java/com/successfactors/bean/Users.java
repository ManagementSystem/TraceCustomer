package com.successfactors.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="t_user")
public class Users {
	
	@Id
	@Column(name= "username",nullable=false,unique=true,length=255)
	private String username;
	
	@Column(name="password",nullable=false,unique=false,length=255)
	private String password;
	
	@Column(name="name",nullable=false,unique=false,length=255)
	private String name;
	
	@Column(name="permission",nullable=false,unique=false,length=255)
	private String permission;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}
	
	
}
