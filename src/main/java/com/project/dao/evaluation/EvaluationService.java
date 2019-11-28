package com.project.dao.evaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.model.Evaluation;

@Service
public class EvaluationService {

	@Autowired
	EvaluationDaoImpl evaluationDaoImpl;

	public Evaluation addScoreToEvaluationDaoImpl(Evaluation evaluation) {
		evaluationDaoImpl.addScore(evaluation);
		return evaluation;
	}

}
