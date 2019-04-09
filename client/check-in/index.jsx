import * as React from "react";
import * as ReactDOM from "react-dom";
import Checkin from "../../components/apps/Checkin";
import { parse } from "querystring";
let values = parse(window.location.search.substring(1));

ReactDOM.render(
    <Checkin showLast={5} eventId={values["eventId"]} />,
    document.getElementById("checkin")
);
