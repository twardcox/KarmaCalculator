import * as React from "react";
import { DialogTitle } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import ErrorMessage from "../widgets/ErrorMessage";

const styles = (theme) => ({
    root: {
        backgroundColor: theme.palette.accent.background,
        [theme.breakpoints.down("sm")]:
        {
            padding: theme.spacing.unit
        },
        [theme.breakpoints.up("sm")]:
        {
            padding: theme.spacing.unit * 2
        },
        position: "relative"
    }
});

const DialogErrorTitle = (props) => (
    <DialogTitle className={props.classes.root}>
        { props.error ?
            <ErrorMessage key={props.error.errorKey} retry={props.error.retry} variant="full" >
                <span>
                    {props.error.message}
                </span>
            </ErrorMessage>
        : null
        }
        {props.children}
    </DialogTitle>
);

DialogErrorTitle.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired
    }),
    children: PropTypes.node.isRequired
}

export default withStyles(styles)(DialogErrorTitle);
