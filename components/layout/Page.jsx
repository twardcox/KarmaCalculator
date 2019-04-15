import * as React from 'react';
import {
	withStyles,
	CssBaseline,
	Toolbar,
	Typography,
	AppBar,
	Grid,
	Avatar,
	Link,
	Menu,
	MenuItem
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { LogoColor, SmallLogo, LogoType } from '../widgets/Logo';
import Tooltip from '../widgets/Tooltip';
import { withUserContext } from '../providers/UserContextProvider';

const styles = (theme) => ({
	layout: {
		width: 'auto',
		maxWidth: 1400,
		margin: 'auto',
		color: theme.palette.common.black
	},
	headerText: {
		display: 'inline'
	},
	link: {
		color: theme.palette.common.white,
		fontSize: '.75em',
		fontWeight: 600,
		cursor: 'pointer'
	},
	avatar: {
		backgroundColor: theme.palette.secondary.light,
		cursor: 'pointer'
	}
});

const getInitials = (name) => {
	if (!name) return '';

	let initials = name
		.split(' ') //todo: consider removing jr, sr, III, etc designations
		.map((n) => (n ? n[0] : ''));

	if (initials.length > 3) {
		initals = intials[0] + initials[intitials.length - 1];
	}

	return initials;
};

class Page extends React.Component {
	constructor(props) {
		super(props);

		this.state = { showManageAccount: false };
		this.avatarClick = this.avatarClick.bind(this);
		this.menuClose = this.menuClose.bind(this);
		this.menuClick = this.menuClick.bind(this);
	}

	avatarClick(e) {
		e.preventDefault();
		this.setState({ anchorEl: e.target });
	}

	menuClose() {
		this.setState({ anchorEl: null });
	}

	menuClick() {}

	logoutClick(e) {
		e.preventDefault();
		window.location.href = '/logout';
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<CssBaseline />
				{this.props.title && (
					<AppBar position="static" color={'primary'}>
						<Toolbar>
							<Grid container alignItems="center" justify="center">
								<Grid item>
									<Grid container alignItems="center" justify="center">
										<Typography
											className={classes.headerText}
											variant="h3"
											align="center"
											color="inherit"
											noWrap
										>
											<span>{this.props.title}</span>
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
				)}
				<div className={classes.layout}>{this.props.children}</div>
			</div>
		);
	}
}

const StyledPage = withUserContext(withStyles(styles)(Page));

StyledPage.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default StyledPage;
