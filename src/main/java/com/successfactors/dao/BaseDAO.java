package com.successfactors.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.LockOptions;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.springframework.transaction.annotation.Transactional;

public abstract class BaseDAO<T, ID extends Serializable> implements
		GenericDAO<T, ID> {

	private static Logger logger = Logger.getLogger(BaseDAO.class);

	private Class<T> persistentClass;
	
	protected static final int ADD = 1;
	
	protected static final int UPDATE = 2;
	
	protected static final int REMOVE = 3;
	
	protected static final int BATCH_SIZE = 100;
	
	@PersistenceContext
	protected EntityManager entityManager;
	

	@SuppressWarnings("unchecked")
	public BaseDAO() {
		Type pt = getClass().getGenericSuperclass();
		if (pt instanceof ParameterizedType) {
			this.persistentClass = (Class<T>) ((ParameterizedType) pt)
					.getActualTypeArguments()[0];
		}
	}

	@Override
	public Session getSession() {
		// TODO Auto-generated method stub
		return (Session)entityManager.unwrap(Session.class);
	}

	@Override
	public void setSession(Session session) {
		// TODO Auto-generated method stub
		
	}
	
	protected void setClazz(final Class<T> clazz){
		this.persistentClass = clazz;
	}
	
	public Class<T> getPersistentClass(){
		return persistentClass;
	}

	@Override
	@Transactional(readOnly = true)
	public T findById(ID id) {
		// TODO Auto-generated method stub
		return findById(id, false);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	@Transactional(readOnly = true)
	public T findById(ID id, boolean lock) {
		// TODO Auto-generated method stub
		return (T) (lock ? getSession().load(getPersistentClass(), id,LockOptions.UPGRADE)
						 : getSession().load(getPersistentClass(), id));
	}
	@Override
	@Transactional(readOnly = true)
	public List<T> findAll() {
		// TODO Auto-generated method stub
		return findByCriteria();
	}
	@Transactional(readOnly = true)
	protected List<T> findByCriteria(Criterion... criterion){
		return findByCriteria(null, criterion);
	}
	
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	protected List<T> findByCriteria(List<Order> orders,Criterion... criterion){
		Criteria criteria = createCriteria(orders,criterion);
		return criteria.list();
	}
	
	@Transactional
	private Criteria createCriteria(List<Order> orders, Criterion... criterion) {
		// TODO Auto-generated method stub
		Criteria cri = getSession().createCriteria(getPersistentClass());
		
		for (Criterion c : criterion) {
			cri.add(c);
		}
		
		if(orders != null){
			for (Order o : orders) {
				cri.addOrder(o);
			}
		}
		return cri;
	}

	@Override
	@Transactional
	public T save(T entity) {
		// TODO Auto-generated method stub
		getSession().saveOrUpdate(entity);
		return entity;
	}

	@Override
	@Transactional
	public void update(T entity) {
		// TODO Auto-generated method stub
		try{
			getSession().update(entity);
		}catch(HibernateException e){
			logger.error("HibernateException on updating an entity of type " + getPersistentClass(), e);
		}
	}

	@Override
	@Transactional
	public void update(List<T> entityList) {
		// TODO Auto-generated method stub
		doBatch(entityList,UPDATE);
	}

	@Override
	public T add(T entity) {
		// TODO Auto-generated method stub
		getSession().save(entity);
		return entity;
	}

	@Override
	@Transactional
	public void add(List<T> entityList) {
		// TODO Auto-generated method stub
		doBatch(entityList, ADD);
	}

	@Override
	@Transactional
	public void remove(T entity) {
		// TODO Auto-generated method stub
		getSession().delete(entity);
	}

	@Override
	@Transactional
	public void remove(List<T> entityList) {
		// TODO Auto-generated method stub
		doBatch(entityList, REMOVE);
	}

	@Override
	public void flush() {
		// TODO Auto-generated method stub
		getSession().flush();
	}

	@Override
	public void clear() {
		// TODO Auto-generated method stub
		getSession().clear();
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return findAll().size();
	}

	@Override
	@Transactional
	public void doBatch(List<T> entityList, int op) {
		// TODO Auto-generated method stub
		int entitySize = entityList.size();
		if((entitySize == 0) || (op < ADD && op >REMOVE)){
			return;
		}
		if(logger.isDebugEnabled()){
			logger.debug("entitySize size is " + entitySize);
		}
		
		try {
			int i = 0;
			for(T entity:entityList){
				i++;
				if(op == ADD){
					this.add(entity);
				}else if(op == UPDATE){
					this.update(entity);
				}else if(op == REMOVE){
					this.remove(entity);
				}
			}
		} catch (HibernateException e) {
			// TODO: handle exception
			logger.error("Hibernate exception: "+ e);
		}
		
		
	}
	
}
