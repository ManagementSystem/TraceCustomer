package com.successfactors.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;


public interface GenericDAO<T,ID extends Serializable> {
	
	T findById(ID id);
	
	T findById(ID id,boolean lock);
	
	List<T> findByCriteria(List<Order> orders,Criterion... criterion);
	
	T getById(ID id);
	
	List<T> findAll();
	
	T save(T entity);
	
	void update(T entity); 
	
	void update(List<T> entityList); 
	
	T add(T entity);
	
	void add(List<T> entityList); 
	
	void remove(T entity);
	
	void remove(List<T> entityList); 
	
	void flush();
	
	void clear();
	
	Session getSession();
	
	void setSession(Session session);
	
	void doBatch(List<T> entityList, int op);
	
	int getCount(List<Order> orders, Criterion... criterion);
	
	boolean isExist(ID id);
}
