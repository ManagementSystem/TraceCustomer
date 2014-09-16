package com.successfactors.dao.impl;

import org.springframework.stereotype.Repository;

import com.successfactors.bean.Users;
import com.successfactors.dao.BaseDAO;
import com.successfactors.dao.UsersDAO;


@Repository
public class UsersDAOImpl extends BaseDAO<Users, String> implements UsersDAO{

}
