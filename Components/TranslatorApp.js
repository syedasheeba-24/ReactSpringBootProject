import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import AdminOptions from "./AdminOptions";
import GetNominations from "./GetNominations";
import CreateForm from "./CreateForm";
import GetForms from "./GetForms";
import FillForm from "./FillForm";
import AssignRole from "./AssignRole";
import NominationDetail from "./NominationDetail";
import UserOptions from "./UserOptions";
import EvaluatorOptions from "./EvaluatorOptions";
import Logout from "./Logout";

function TranslatorApp() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/options" component={AdminOptions} />
        <Route path="/useroptions" component={UserOptions} />
        <Route path="/evaluatoroptions" component={EvaluatorOptions} />
        <Route path="/create" component={CreateForm} />
        <Route path="/getforms" component={GetForms} />
        <Route path="/fillform" component={FillForm} />
        <Route path="/logout" component={Logout} />
        <Route
          path="/getnominationbygroup/:projectType/:username"
          component={NominationDetail}
        />
        <Route path="/assign" component={AssignRole} />
        <Route path="/show/:username" component={GetNominations} />
      </div>
    </Router>
  );
}

export default TranslatorApp;
