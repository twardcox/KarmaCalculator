import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { FormControl, FormLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
	formControl: {
		padding: theme.spacing.unit * 3,
		width: '100%'
	},
	group: {
		margin: `${theme.spacing.unit}px 0`
	},

	grid: {
		maxWidth: '9%'
	},
	divider: {
		height: 5,
		backgroundColor: theme.palette.primary.main
	},
	typography: {
		color: theme.palette.error.main,
		border: `5px solid ${theme.palette.error.main}`,
		padding: theme.spacing.unit * 3,
		backgroundColor: theme.palette.error.light
	}
});

class KarmaRadioButtons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { classes } = this.props;

		return (
			<FormControl component="fieldset" className={classes.formControl}>
				<Grid container justify="space-between">
					<Grid item>
						<FormLabel component="legend">Not at all like me</FormLabel>
					</Grid>
					<Grid item>
						<FormLabel component="legend">On the nose!</FormLabel>
					</Grid>
				</Grid>
				<Grid container justify="space-between">
					<Grid className={classes.grid} item xs={12} sm={2}>
						<Radio
							checked={this.props.selectedValue === '-2'}
							onChange={this.props.handleChange}
							value="-2"
							name="Karma-value--2"
							aria-label="-2"
						/>
					</Grid>

					<Grid className={classes.grid} item xs={12} sm={2}>
						<Radio
							checked={this.props.selectedValue === '-1'}
							onChange={this.props.handleChange}
							value="-1"
							name="Karma-value--1"
							aria-label="-1"
						/>
					</Grid>

					<Grid className={classes.grid} item xs={12} sm={2}>
						<Radio
							inputRef={(ref) => {
								if (!this.state.popoverAnchor && this.props.showPrompt)
									this.setState({ popoverAnchor: ref });
							}}
							aria-owns={open ? 'simple-popper' : undefined}
							aria-haspopup="true"
							checked={this.props.selectedValue === '0'}
							onChange={this.props.handleChange}
							value="0"
							name="Karma-value-0"
							aria-label="0"
						/>
						<Popover
							id="simple-popper"
							open={this.props.showPrompt}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center'
							}}
							anchorEl={this.state.popoverAnchor}
							anchorReference="anchorEl"
						>
							<Typography className={classes.typography}>Please make a selection.</Typography>
						</Popover>
					</Grid>

					<Grid className={classes.grid} item xs={12} sm={2}>
						<Radio
							checked={this.props.selectedValue === '1'}
							onChange={this.props.handleChange}
							value="1"
							name="Karma-value-1"
							aria-label="1"
						/>
					</Grid>
					<Grid className={classes.grid} item xs={12} sm={2}>
						<Radio
							checked={this.props.selectedValue === '2'}
							onChange={this.props.handleChange}
							value="2"
							name="Karma-value-2"
							aria-label="2"
						/>
					</Grid>
				</Grid>

				<Divider className={classes.divider} />
			</FormControl>
		);
	}
}

KarmaRadioButtons.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KarmaRadioButtons);
