import * as React from 'react';

import Section from '../layout/Section';
import { ProviderWrapper } from '../providers';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	scale: {
		postition: 'relative',
		left: 0,
		top: 0,
		backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} , ${theme.palette.secondary.light})`,
		borderRadius: 50,
		height: 30,
		width: '80%',
		margin: 'auto'
	},
	horizLoc: {
		textAlign: 'right'
	}
});

// center of div in px = screen width * 80% = div width / 2
// + (score * a factor) to center for bar location

const Scores = () => ({
	render() {
		const { classes } = this.props;
		// const PositionedTypography = positionHoc(() => 400 + this.props.score * 3)(Typography);

		return (
			<Section className={classes.section}>
				<Typography>what goes here?</Typography>
				<div className={classes.scale}>
					<Typography style={{ width: 400 + this.props.score * 3 }} className={classes.horizLoc}>
						{this.props.score}
					</Typography>
				</div>
			</Section>
		);
	}
});

const StyledScores = withStyles(styles)(Scores);
export default (props) => (
	<ProviderWrapper>
		<StyledScores {...props} />
	</ProviderWrapper>
);
