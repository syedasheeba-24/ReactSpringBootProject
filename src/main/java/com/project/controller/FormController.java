package com.project.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.dao.evaluation.EvaluationService;
import com.project.dao.formactivation.FormActivationService;
import com.project.dao.forms.FormService;
import com.project.dao.login.LoginService;
import com.project.dao.nomination.NominationService;
import com.project.model.FormActivation;
import com.project.model.Login;
import com.project.model.Evaluation;
import com.project.model.Form;
import com.project.model.Nomination;

@RestController
@RequestMapping("/")
public class FormController {

	@Autowired
	FormService formService;

	@Autowired
	FormActivationService formActivationService;

	@Autowired
	LoginService loginService;

	@Autowired
	NominationService nominationService;

	@Autowired
	EvaluationService evaluationService;

	// Post request method that saves a created form into the database.
	@RequestMapping(method = RequestMethod.POST, value = "/create-forms")
	public Form saveForm(@RequestBody Form form) {
		formService.sendFormToDaoImpl(form);
		return form;
	}

	// Post request method that saves data of form to be activated into the
	// database.
	@RequestMapping(method = RequestMethod.POST, value = "/saveform")
	public FormActivation saveChangesById(@RequestBody FormActivation form) {
		formActivationService.sendActivatedFormToDaoImpl(form);
		return form;
	}

	// Get request method that returns a activated form to be filled
	@RequestMapping(method = RequestMethod.GET, value = "/get-activated-form/{category}")
	public Form showFormActivated(@PathVariable String category) {
		return formActivationService.getFormActivatedFromDaoImpl(category);
	}

	// Post request method that saves details of nomination
	@RequestMapping(method = RequestMethod.POST, value = "/save-nomination")
	public Nomination saveNomination(@RequestBody Nomination nomination) {
		nominationService.sendNominationToDaoImpl(nomination);
		return nomination;
	}

	// Get request method that returns requested Nomination form by Id
	@RequestMapping(method = RequestMethod.GET, value = "/get-nomination/{id}")
	public Nomination showNominationById(@PathVariable String id) {
		return nominationService.getNominationByIdFromDaoImpl(id);
	}

	// Get request method that retrieves submitted nominations grouped by project
	// category
	@RequestMapping(method = RequestMethod.GET, value = "/get-nomination-by-group/{idOfActivatedForm}")
	public List<Nomination> showNominationByGroup(@PathVariable String idOfActivatedForm) {
		return nominationService.getNominationByGroupFromDaoImpl(idOfActivatedForm);
	}

	// Get request method that receives login credentials and performs
	// authentication
	@RequestMapping(method = RequestMethod.GET, value = "/auth/{username}/{password}")
	public int isValid(@PathVariable String username, @PathVariable String password) {
		return loginService.isLoginSuccessful(username, password);
	}

	// Get request method that sends back list of various project categories
	@RequestMapping(method = RequestMethod.GET, value = "/get-categories")
	public List<String> getCategories() {
		return formService.getCategoriesFromDaoImpl();
	}

	// Get request method that sends back list of forms under a specific project
	// category
	@RequestMapping(method = RequestMethod.GET, value = "/get-forms/{category}")
	public List<Form> getFormsByCategory(@PathVariable String category) {
		return formService.getFormsByCategoryFromDaoImpl(category);
	}

	// Get request method that returns id of document containing activated form
	@RequestMapping(method = RequestMethod.GET, value = "/get-id")
	public String getIdOfActivatedForm() {
		return formActivationService.getIdOfFormActivated();
	}

	// Get request method that sends back list of activated project categories
	@RequestMapping(method = RequestMethod.GET, value = "/get-activated-categories")
	public List<String> getActivatedCategories() {
		return formService.getActivatedCategoriesFromDaoImpl();
	}

	// Get request method that sends back list of activated project categories
	@RequestMapping(method = RequestMethod.GET, value = "/get-activated-ids")
	public String[] getActivatedFormsId() {
		return formActivationService.getIdsFromActivatedForm();
	}

	// Post request method that receives login credentials and performs
	// authentication
	@RequestMapping(method = RequestMethod.POST, value = "/register")
	public Login registerRole(@RequestBody Login login) {
		return loginService.registerRole(login);
	}

	// Post request method that saves data of score to be entered into the
	// database.
	@RequestMapping(method = RequestMethod.POST, value = "/savescore")
	public Evaluation addScore(@RequestBody Evaluation evaluation) {
		evaluationService.addScoreToEvaluationDaoImpl(evaluation);
		return evaluation;
	}

	// Get request method that retrieves index positions of fields that are
	// mandatory
	@RequestMapping(method = RequestMethod.GET, value = "/get-ids/{category}")
	public List<Integer> getFieldPositions(@PathVariable String category) {
		return formActivationService.findFieldPosOfMandatoryField(category);
	}

}
