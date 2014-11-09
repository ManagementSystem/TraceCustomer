package com.successfactors.dao.impl;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.successfactors.bean.Users;
import com.successfactors.constant.UserAuthConstants;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.UsersDAO;


@Repository
public class UsersDAOImpl extends BaseDAO<Users, String> implements UsersDAO{

	@Override
	public List<Users> getUsersByType(String type) {
		// TODO Auto-generated method stub
		return findByCriteria(Restrictions.eq("permission", type));
	}

}
