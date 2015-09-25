package com.yanhom.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yanhom.dao.impl.UserDaoImpl;
import com.yanhom.entity.User;
import com.yanhom.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	public UserDaoImpl userDao;

	public void add(User u) {
		userDao.add(u);
	}

}
