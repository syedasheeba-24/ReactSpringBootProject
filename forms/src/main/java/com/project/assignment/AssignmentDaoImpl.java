package com.project.assignment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.project.model.Assignment;

@Repository
public class AssignmentDaoImpl implements AssignmentDao {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public Assignment assignPaper(Assignment assignment) {
		return assignment;
	}
}
