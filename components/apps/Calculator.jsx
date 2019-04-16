import * as React from 'react';

import { Button } from '@material-ui/core';
import Page from '../layout/Page';
import Section from '../layout/Section';
import { ProviderWrapper } from '../providers';
import Card from '@material-ui/core/Card';
import Slide from '@material-ui/core/Slide';
import KarmaRadioButtons from '../widgets/KarmaRadioButtons';
import { Typography } from '@material-ui/core';
import Questions from './Questions';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	card: {
		padding: theme.spacing.unit * 3,
		textAlign: 'center',
		fontSize: theme.spacing.unit * 4
	},
	instruction: {
		fontSize: theme.spacing.unit * 4
	}
});

class Calculator extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			totalQuestions: Questions.length,
			remainingQuesitons: Questions.length,
			newQuestion: false,
			selectedValue: null,
			totalValue: 0
		};
		this.nextQuestion = this.nextQuestion.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ selectedValue: event.target.value });
	}

	nextQuestion() {
		let newCount = this.state.remainingQuesitons;
		let newTotVal = Number(this.state.totalValue) + Number(this.state.selectedValue);

		this.setState((state) => ({ newQuestion: !state.newQuestion }));
		if (newCount > 0) {
			this.setState({ remainingQuesitons: (newCount -= 1), selectedValue: null, totalValue: newTotVal });
		}
	}

	render() {
		const currentQuestion = this.state.totalQuestions - this.state.remainingQuesitons;

		const { classes } = this.props;
		return (
			<Page title="Karma Calculator">
				<Section>
					<Typography className={classes.instruction}>
						Rate each statement or word according to how well it describes you. Base your ratings on how you
						really are, not how you would like to be.
					</Typography>
					<Slide direction={'left'} key={this.state.remainingQuesitons} in={true}>
						<Card className={classes.card} raised={true}>
							<KarmaRadioButtons {...this.state} handleChange={this.handleChange} />
							<Typography className={classes.card}>{Questions[currentQuestion]}</Typography>
						</Card>
					</Slide>
					<div>
						<Button
							disabled={currentQuestion + 1 === this.state.totalQuestions ? true : false}
							style={{ margin: 12 }}
							variant="contained"
							color="primary"
							onClick={this.nextQuestion}
						>
							next
						</Button>
						<Typography>
							Question {currentQuestion + 1} of {this.state.totalQuestions}
						</Typography>
					</div>
				</Section>
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
