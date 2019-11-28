package com.project.dao.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import com.project.model.Login;

@Repository
public class LoginDaoImpl implements LoginDao {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public int isValid(String username, String password) {
		Login login = new Login();
		Query query = new Query();
		query.addCriteria(Criteria.where("username").is(username));
		login = mongoTemplate.findOne(query, Login.class);
		if (login != null) {
			if (login.getRole().equals("admin")) {
				return 0;
			} else {
				return 1;
			}
		} else
			return -1;
	}

	@Override
	public Login assignOrUpdateRole(Login login) {
		Login tempLogin = new Login();
		Query query = new Query();
		query.addCriteria(Criteria.where("username").is(login.getUsername()));
		tempLogin = mongoTemplate.findOne(query, Login.class);
		if(tempLogin!=null) {
		tempLogin.setRole(login.getRole());
		mongoTemplate.save(tempLogin);
		}
		else {
			mongoTemplate.save(login);
		}
		return login;
	}
}
