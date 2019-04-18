import * as React from 'react';
import Section from '../layout/Section';
import Card from '@material-ui/core/Card';
import Slide from '@material-ui/core/Slide';
import KarmaRadioButtons from '../widgets/KarmaRadioButtons';
import { Typography } from '@material-ui/core';
import Questions from './KarmaQuestions';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

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

const KarmaCalcComponenet = () => ({
	render() {
		const currentQuestion = this.props.currentQuestion;

		const { classes } = this.props;

		return (
			<div>
				{this.props.remainingQuesitons === 0 ? (
					<Section>
						<Grid container>
							<Grid item xs={10}>
								<Button
									className={classes.button}
									variant="contained"
									color="primary"
									onClick={this.props.revealScore}
								>
									View Karmic Score
								</Button>
							</Grid>
						</Grid>
					</Section>
				) : (
					<Section>
						<Typography className={classes.instruction}>
							Rate each statement or word according to how well it describes you.
						</Typography>
						<Typography className={classes.instruction}>
							Base your ratings on how you really are, not how you would like to be.
						</Typography>
						<Slide direction={'left'} key={this.props.remainingQuesitons} in={true}>
							<Card className={classes.card} raised={true}>
								<KarmaRadioButtons
									selectedValue={this.props.selectedValue}
									handleChange={this.props.handleChange}
									showPrompt={this.props.showPrompt}
								/>
								<Typography className={classes.card}>{Questions[currentQuestion]}</Typography>
							</Card>
						</Slide>
						<Grid container justify="space-evenly">
							<Grid item xs={10}>
								<Button
									className={classes.button}
									variant="contained"
									color="primary"
									onClick={this.props.nextQuestion}
								>
									next
								</Button>
							</Grid>
							<Grid item xs={2}>
								<Typography>
									Question {currentQuestion + 1} of {this.props.totalQuestions}
								</Typography>
							</Grid>
						</Grid>
					</Section>
				)}
			</div>
		);
	}
});

export default withStyles(styles)(KarmaCalcComponenet);
