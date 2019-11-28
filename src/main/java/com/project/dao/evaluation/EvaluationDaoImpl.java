package com.project.dao.evaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.project.model.Evaluation;
import com.project.model.Login;

@Repository
public class EvaluationDaoImpl implements EvaluationDao {

	@Autowired
	MongoTemplate mongoTemplate;

	@Override
	public Evaluation addScore(Evaluation evaluation) {
		Evaluation evaluation2 = new Evaluation();
		Query query = new Query();
		query.addCriteria(Criteria.where("nameOfEvaluator").is(evaluation.getNameOfEvaluator()));
		evaluation2 = mongoTemplate.findOne(query, Evaluation.class);
		if (evaluation2 != null) {
			evaluation2.setListOfScore(evaluation.getListOfScore());
			mongoTemplate.save(evaluation2);
		} else {
			mongoTemplate.save(evaluation);
		}
		return evaluation;
	}
}
