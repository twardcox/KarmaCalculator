import * as React from "react";
import * as ReactDOM from "react-dom";
//import "typeface-roboto";  //need to fix webpack to load css and font files first
import EventLanding from "../components/apps/EventLanding";

ReactDOM.render(
    <EventLanding />,
    document.getElementById("event-landing")
);
