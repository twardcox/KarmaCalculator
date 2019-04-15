import * as React from 'react';

import { Button } from '@material-ui/core';
import Page from '../layout/Page';
import Section from '../layout/Section';
import { ProviderWrapper } from '../providers';
import Card from '@material-ui/core/Card';
import Slide from '@material-ui/core/Slide';
import KarmaRadioButtons from '../widgets/KarmaRadioButtons';

class Calculator extends React.Component {
	constructor(props) {
		super(props);

		this.state = { totalQuestions: 10, remainingQuesitons: 10, newQuestion: false, selectedValue: null };
		this.nextQuestion = this.nextQuestion.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ selectedValue: event.target.value });
	}

	nextQuestion() {
		let newCount = this.state.remainingQuesitons;

		this.setState((state) => ({ newQuestion: !state.newQuestion }));
		if (newCount > 0) {
			this.setState({ remainingQuesitons: (newCount -= 1), selectedValue: null });
		}
	}

	render() {
		return (
			<Page title="Karma Calculator">
				<Section>
					<Slide direction={'left'} key={this.state.remainingQuesitons} in={true}>
						<Card raised={true}>
							<KarmaRadioButtons {...this.state} handleChange={this.handleChange} />
						</Card>
					</Slide>
					<div>
						<Button style={{ margin: 12 }} variant="contained" color="primary" onClick={this.nextQuestion}>
							next
						</Button>
					</div>
				</Section>
			</Page>
		);
	}
}

// Keep MuiThemeProvider outside of a control that changes state
// so that the theme doesn't re-render
export default (props) => (
	<ProviderWrapper>
		<Calculator {...props} />
	</ProviderWrapper>
);
