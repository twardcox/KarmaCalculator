import * as React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PhoneValidator extends React.Component {
    componentDidMount() {
        ValidatorForm.addValidationRule('isPhone', (value) => {
            return !value || value.match(/^\(?\d{3}\) \d{3}-\d{4}$/);
        });
    }

    render() {
        return (
            <TextValidator
                {...this.props}
                validators={['isPhone']}
                errorMessages={['Invalid phone format']}
            />
        );
    }
}

// export default DateTimePicker;
export default PhoneValidator;
