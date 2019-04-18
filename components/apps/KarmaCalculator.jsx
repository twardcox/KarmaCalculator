import * as React from 'react';

import Page from '../layout/Page';
import { ProviderWrapper } from '../providers';
import Questions from './KarmaQuestions';
import { withStyles } from '@material-ui/core/styles';
import KarmaScores from './KarmaScores';

import StyledKarmaCalculator from './KarmaTest';

const styles = (theme) => ({
	card: {
		padding: theme.spacing.unit * 3,
		textAlign: 'center',
		fontSize: theme.spacing.unit * 4
	},
	instruction: {
		fontSize: theme.spacing.unit * 4,
		textAlign: 'center'
	},
	button: {
		margin: theme.spacing.unit * 2
	}
});

class Calculator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			totalQuestions: Questions.length,
			remainingQuesitons: Questions.length,

			selectedValue: null,
			totalValue: 0,
			showPrompt: false,
			showScore: false
		};
		this.nextQuestion = this.nextQuestion.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.removePrompt = this.removePrompt.bind(this);
		this.revealScore = this.revealScore.bind(this);
	}

	handleChange(event) {
		this.setState({ selectedValue: event.target.value });
	}

	nextQuestion(event) {
		event.stopPropagation();
		let newCount = this.state.remainingQuesitons;
		let newTotVal = Number(this.state.totalValue) + Number(this.state.selectedValue);
		if (!this.state.selectedValue) {
			this.setState({ showPrompt: true });
		} else {
			if (newCount > 0) {
				this.setState({ remainingQuesitons: (newCount -= 1), selectedValue: null, totalValue: newTotVal });
			}
		}
	}

	removePrompt() {
		this.setState({ showPrompt: false });
	}

	revealScore() {
		this.setState({ showScore: true });
	}

	render() {
		const currentQuestion = this.state.totalQuestions - this.state.remainingQuesitons;

		return (
			<Page
				title={this.state.showScore === false ? 'Karma Calculator' : 'Karmic Score'}
				onClick={this.removePrompt}
			>
				{this.state.showScore === false ? (
					<StyledKarmaCalculator
						{...this.state}
						revealScore={this.revealScore}
						currentQuestion={currentQuestion}
						handleChange={this.handleChange}
						nextQuestion={this.nextQuestion}
					/>
				) : (
					<KarmaScores score={this.state.totalValue} />
				)}
			</Page>
		);
	}
}

// Keep MuiThemeProvider outside of a control that changes state
// so that the theme doesn't re-render

const StyledCalculator = withStyles(styles)(Calculator);
export default (props) => (
	<ProviderWrapper>
		<StyledCalculator {...props} />
	</ProviderWrapper>
);
