import { withStyles, Typography } from "@material-ui/core";
import * as React from "react";

const styles = (theme) => ({
    layout: {
        margin: "auto",
        padding: Math.round(theme.spacing.unit * 1.25),
        width: "auto",
        height: "auto"
    },
    form: {
        display: "block",
        alignContent: "left"
    },
    header: {
        marginBottom: -theme.spacing.unit * 2
    }
});

class FormComponent extends React.Component {
    render() {
        const { classes, title, ...props } = this.props;
        return (
            <div className={classes.layout}>
                {title &&
                    <Typography variant="h4" className={classes.header}>{title}</Typography>
                }
                <form {...props} className={classes.form}>
                    {this.props.children}
                </form>
            </div>
        );
    }
}



export default withStyles(styles)(FormComponent);
