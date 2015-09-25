package com.yanhom.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="t_user")
public class User {
	
	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Integer id;
	@Column
	public String qq;
	@Column
	public String pass;
	public User() {
		super();
	}
	
	public User(Integer id, String qq, String pass) {
		super();
		this.id = id;
		this.qq = qq;
		this.pass = pass;
	}

	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	

}
