package com.project.dao.login;

import java.util.ArrayList;
import java.util.List;

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

		Query query = new Query();
		List<Login> listOfEvents;
		query.addCriteria(Criteria.where("username").is(username));
		listOfEvents = mongoTemplate.find(query, Login.class);
		if (listOfEvents.size() >= 1) {
			if (listOfEvents.size() > 1 && listOfEvents.get(0).getRole().equals("evaluator")) {
				return 3;
			} else if (listOfEvents.size() > 1 || listOfEvents.get(0).getRole().equals("admin")) {
				return 0;
			} else if (listOfEvents.size() == 1 && listOfEvents.get(0).getRole().equals("evaluator")) {
				if (listOfEvents.get(0).getEvent().equals("devcon")) {
					return 1;
				} else
					return 2;
			} else
				return -1;
		} else
			return -1;
	}

	@Override
	public Login assignOrUpdateRole(Login login) {
		Login tempLogin = new Login();
		Query query = new Query();
		query.addCriteria(Criteria.where("username").is(login.getUsername()));
		query.addCriteria(Criteria.where("event").is(login.getEvent()));
		tempLogin = mongoTemplate.findOne(query, Login.class);
		if (tempLogin != null) {
			tempLogin.setRole(login.getRole());
			mongoTemplate.save(tempLogin);
		} else {
			mongoTemplate.save(login);
		}
		return login;
	}
}
