import * as React from "react";
import { DialogContent, DialogActions,  Grid } from "@material-ui/core";
import { ValidatorForm } from 'react-material-ui-form-validator';
import IconButton from "../widgets/IconButton"
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const styles = (theme) => ({
    content: {
        minWidth:270,
        [theme.breakpoints.down("sm")]:
        {
            padding: theme.spacing.unit,
            "&:first-child": {
                paddingTop: theme.spacing.unit
            },
        },
        [theme.breakpoints.up("sm")]:
        {
            padding: theme.spacing.unit * 2,
            "&:first-child": {
                paddingTop: theme.spacing.unit * 2
            }
        },
    },
    fieldSet: {
        padding: 0,
        margin: 0,
        border: "none"
    }
});

class DialogForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {disabled, classes, actions, ...props} = this.props;

        if (!props.onSubmit) props.onSubmit = (e) => {
            e.nativeEvent.target.submit();
        }

        return (
            <ValidatorForm {...props}>
                <fieldset disabled={disabled} className={classes.fieldSet}>
                    <DialogContent className={classes.content}>
                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="flex-start">
                            {this.props.children}
                        </Grid>
                    </DialogContent>
                    {actions &&
                        <DialogActions>
                            {actions.map( ({callback, label, color, formAction, loading}, index) =>
                                <IconButton type={formAction} key={index} disabled={disabled} loading={loading} onClick={formAction ? null : callback } color={color}>
                                    {label}
                                </IconButton>
                            )}
                        </DialogActions>
                    }
                </fieldset>
            </ValidatorForm>
        );
    }
}

DialogForm.propTypes = {
    children: PropTypes.node.isRequired
};

export default withStyles(styles)(DialogForm);
