package com.successfactors.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Session;


public interface GenericDAO<T,ID extends Serializable> {
	
	T findById(ID id);
	
	T findById(ID id,boolean lock);
	
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
	
	int getCount();
}
