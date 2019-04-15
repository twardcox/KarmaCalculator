import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import "typeface-roboto";  //need to fix webpack to load css and font files first
import KarmaLanding from '../components/apps/KarmaLanding';

ReactDOM.render(<KarmaLanding />, document.getElementById('karma-landing'));
