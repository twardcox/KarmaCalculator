import * as React from "react";
import Switch from "../widgets/StyledSwitch";
import DialogForm from "../layout/DialogForm";
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";
import PhoneMask from "../widgets/PhoneMask"
import PropTypes from 'prop-types';
import FormField from "./FormField";
import ReadOnlyField from "../widgets/ReadOnlyField";
import PhoneValidator from "../widgets/PhoneValidator";

class CheckinDetailsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventId: props.eventId,
            name: props.attendee,
            organization: "",
            phone: "",
            email: "",
            optIn: false
        }

        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    save(e) {
        e.preventDefault();
        this.props.onSave && this.props.onSave(this.state);
    }

    cancel(e) {
        e.preventDefault();
        this.props.onCancel && this.props.onCancel();
    }

    handleInputChange(name, value) {
        this.setState({[name]: value});
    }

    render() {

        const {onCancel, onSave, eventId, attendee, saving, ...props} = this.props;

        const actions = [
            {
                label: "Cancel",
                formAction: "reset",
                color: "secondary"
            },
            {
                label: "Done",
                formAction: "submit",
                color: "primary",
                loading: saving
            }
        ];

        props.autoComplete = "off";
        props.onSubmit = this.save;
        props.onReset = this.cancel;
        props.actions = actions;

        return (
                <DialogForm {...props}>
                    <FormField>
                        <ReadOnlyField name="name" value={this.state.name} disabled={this.props.disabled} />
                    </FormField>

                    <FormField>
                        <TextValidator
                            id="organization"
                            name="organization"
                            placeholder="Your Organization"
                            label="Organization"
                            onChange={ (e) => this.handleInputChange(e.target.name, e.target.value)}
                            margin="dense"
                            value={this.state.organization}
                            disabled={this.props.disabled}
                            autoComplete="off"
                            autoFocus/>
                    </FormField>

                    <FormField>
                        <TextValidator
                            id="email"
                            name="email"
                            placeholder="email address"
                            label="Email"
                            onChange={ (e) => this.handleInputChange(e.target.name, e.target.value)}
                            margin="dense"
                            validators={['isEmail']}
                            errorMessages={['not a valid email address']}
                            withRequiredValidator={true}
                            value={this.state.email}
                            disabled={this.props.disabled}
                            autoComplete="off"
                        />
                    </FormField>

                    <FormField>
                        <PhoneValidator
                            id="phone"
                            name="phone"
                            label="Phone"
                            onChange={ (e) => this.handleInputChange(e.target.name, e.target.value)}
                            margin="dense"
                            value={this.state.phone}
                            disabled={this.props.disabled}
                            autoComplete="off"
                            InputProps={{
                                inputComponent: PhoneMask,
                              }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </FormField>

                    <FormField>
                        <Switch
                            name="optIn"
                            checked={this.state.optIn}
                            onChange={(e) => this.handleInputChange(e.target.name,e.target.checked)}
                            value={this.state.optIn}
                            disabled={this.props.disabled}
                            label="Include me in emails"
                        />
                    </FormField>
                </DialogForm>
        );
    }
}

CheckinDetailsForm.propTypes = {
    eventId: PropTypes.string.isRequired,
    attendee: PropTypes.string.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    disabled: PropTypes.bool
}

export default CheckinDetailsForm;
