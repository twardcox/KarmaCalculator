import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import { FormControl, FormLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

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
	}
});

const KarmaRadioButtons = (props) => ({
	render() {
		const { classes } = props;

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
							checked={this.props.selectedValue === '1'}
							onChange={props.handleChange}
							value="1"
							name="radio-button-demo"
							aria-label="1"
						/>
					</Grid>

					<Grid className={classes.grid} item xs={12} sm={2}>
						<Radio
							checked={this.props.selectedValue === '2'}
							onChange={props.handleChange}
							value="2"
							name="radio-button-demo"
							aria-label="2"
						/>
					</Grid>

					<Grid className={classes.grid} item xs={12} sm={2}>
						<Radio
							checked={this.props.selectedValue === '3'}
							onChange={props.handleChange}
							value="3"
							name="radio-button-demo"
							aria-label="3"
						/>
					</Grid>

					<Grid className={classes.grid} item xs={12} sm={2}>
						<Radio
							checked={this.props.selectedValue === '4'}
							onChange={props.handleChange}
							value="4"
							name="radio-button-demo"
							aria-label="4"
						/>
					</Grid>
					<Grid className={classes.grid} item xs={12} sm={2}>
						<Radio
							checked={this.props.selectedValue === '5'}
							onChange={props.handleChange}
							value="5"
							name="radio-button-demo"
							aria-label="5"
						/>
					</Grid>
				</Grid>

				<Divider className={classes.divider} />
			</FormControl>
		);
	}
});

KarmaRadioButtons.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(KarmaRadioButtons);
