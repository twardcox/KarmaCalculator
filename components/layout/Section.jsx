import * as React from "react";
import { withStyles, Paper } from "@material-ui/core";
import ErrorMessage from "../widgets/ErrorMessage";
import PropTypes from 'prop-types';

const style = (theme) => ({
    layout: {
        [theme.breakpoints.down("sm")]: {
            margin: 0,
            borderRadius: 0,
            padding: theme.spacing.unit
        },
        [theme.breakpoints.up("sm")]: {
            margin: theme.spacing.unit * 2,
            padding: theme.spacing.unit * 2
        },
        [theme.breakpoints.up("lg")]: {
            margin: theme.spacing.unit * 4,
            padding: theme.spacing.unit * 4
        }
    }
});

const Section = (props) => {
    const { classes } = props;
    return (
        <Paper className={classes.layout}>
            { props.error ?
                <ErrorMessage key={props.error.errorKey} retry={props.error.retry}>
                    <span>{props.error.message}</span>
                </ErrorMessage>
            : null
            }
            {props.children}
        </Paper>
    );
}

Section.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired
    }),
    children: PropTypes.node.isRequired
}

export default withStyles(style)(Section)
