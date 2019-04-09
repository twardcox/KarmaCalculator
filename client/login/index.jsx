import * as React from "react";
import * as ReactDOM from "react-dom";
//import "typeface-roboto";  //need to fix webpack to load css and font files first
import Login from "../../components/apps/Login"
import { parse } from "querystring";
let values = parse(window.location.search.substring(1));

ReactDOM.render(
    <Login redirect={values["redirect"]} />,
    document.getElementById("login")
);
