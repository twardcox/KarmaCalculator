import * as React from "react";
import { withStyles, Link } from "@material-ui/core";
import Renew from "@material-ui/icons/Autorenew"
import Dismiss from "@material-ui/icons/HighlightOff";
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';

const style = (theme) => ({
    error: {
        padding: theme.spacing.unit,
        color: theme.palette.error.dark,
        backgroundColor: theme.palette.error.light,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%"
    },
    errorContained: {
        "& > div": {
            borderWidth: 2,
            borderRadius: 5,
            borderStyle: "solid",
            borderColor: theme.palette.error.dark
        },
        marginBottom: theme.spacing.unit
    },
    errorFull: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    wrapper: {
        height: "100%"
    },
    retry: {
        marginLeft: theme.spacing.unit,
        cursor: "pointer"
    },
    retryIcon: {
        transform: "translateY(25%)"
    }
});

class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {dismissed: false};
    }

    onDismiss() {
        this.setState({dismissed: true});
    }

    onRetry(e) {
        e.preventDefault();
        this.setState({dismissed: true});
        this.props.retry();
    }

    render() {
        const { classes, variant } = this.props;

        return (
                <Collapse classes={{wrapper: classes.wrapper}} in={!this.state.dismissed} className={variant && variant.toLowerCase() == "full" ? classes.errorFull : classes.errorContained} >
                    <div className={classes.error}>
                        <span>
                            <strong>
                                Error: {this.props.children}
                            </strong>
                            {this.props.retry &&
                                <Link className={classes.retry} onClick={ this.onRetry.bind(this) }>
                                    retry
                                    <Renew className={classes.retryIcon} fontSize="inherit" />
                                </Link>
                            }
                        </span>
                        <Dismiss
                            onClick={ this.onDismiss.bind(this) }
                        />
                    </div>
                </Collapse>
        );
    }
}

ErrorMessage.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string
}

export default withStyles(style)(ErrorMessage);
