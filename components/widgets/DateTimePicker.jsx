import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = (theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginTop: theme.spacing.unit * 2,
        width: "100%",
        minWidth: 200
    }
});

class DateTimePicker extends React.Component {
    componentDidMount() {
        ValidatorForm.addValidationRule('isFutureDate', (value) => {
           let date = new Date(value);
           return date > new Date();
        });
    }

    render() {
        const { classes, ...remainder } = this.props;

        return (
            <div className={classes.container}>
                <TextValidator
                    {...remainder}
                    type="datetime-local"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true
                    }}
                    validators={['required', 'isFutureDate']}
                    errorMessages={['this field is required', 'the date must be in the future']}
                    withRequiredValidator={true}
                />
            </div>
        );
    }
}

DateTimePicker.propTypes = {
    classes: PropTypes.object.isRequired
};

// export default DateTimePicker;
export default withStyles(styles)(DateTimePicker);
