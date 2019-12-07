import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import AdminOptions from "./AdminOptions";
import Admin from "./Admin";
import Evaluator from "./Evaluator";
import CreateForm from "./CreateForm";
import GetForms from "./GetForms";
import FillForm from "./FillForm";
import AssignRole from "./AssignRole";
import NominationDetail from "./NominationDetail";

function TranslatorApp() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/options" component={Admin} />
        <Route path="/create" component={CreateForm} />
        <Route path="/getforms" component={GetForms} />
        <Route path="/fillform" component={FillForm} />
        <Route
          path="/getnominationbygroup/:projectType/:username"
          component={NominationDetail}
        />
        <Route path="/assign" component={AssignRole} />
        <Route path="/show/:username" component={Evaluator} />
      </div>
    </Router>
  );
}

export default TranslatorApp;
