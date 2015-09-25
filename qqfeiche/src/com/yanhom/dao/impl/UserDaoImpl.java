package com.yanhom.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yanhom.dao.UserDao;

import com.yanhom.entity.User;

@Repository
public class UserDaoImpl implements UserDao {

	@Autowired
	SessionFactory sessionfactory;
	public void add(User u)  {
		sessionfactory.getCurrentSession().save(u);
	}
}
