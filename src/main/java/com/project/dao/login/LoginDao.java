package com.project.dao.login;

import com.project.model.Login;

public interface LoginDao {

	public int isValid(String username, String password);
	public Login assignOrUpdateRole(Login login);
	
}
