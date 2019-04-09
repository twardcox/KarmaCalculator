import * as React from "react";
import { TextValidator} from 'react-material-ui-form-validator';

import DateTimePicker from "../widgets/DateTimePicker";
import DialogForm from "../layout/DialogForm";

class EventDetailsForm extends React.Component {
    constructor(props) {
        super(props);

        let name = "", start = "", eventId = "";
        if (this.props.event) {
            name = this.props.event.name;
            start = this.props.event.start;
            eventId = this.props.event.eventId;
        }

        this.state = { name, start, eventId};
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    save(e) {
        e.preventDefault();
        const detail = ({
            name: this.state.name,
            start: this.state.start,
            eventId: this.state.eventId
        });
        this.props.onSubmit && this.props.onSubmit(detail);
    }

    cancel(e) {
        e.preventDefault();
        this.props.onCancel && this.props.onCancel();
    }

    handleInputChange(name, value) {
        this.setState({[name]: value});
    }

    render() {
        const {onCancel, onSave, saving, ...props} = this.props;

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
                <input name="eventId" type="hidden" value={this.state.eventId} />
                <TextValidator
                    id="name"
                    name="name"
                    label="Event Name"
                    placeholder="Event Name"
                    onChange={ (e) => this.handleInputChange(e.target.name, e.target.value)}
                    margin="dense"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    withRequiredValidator={true}
                    value={this.state.name}
                    autoComplete="off"
                />
                <DateTimePicker
                    id="start"
                    name="start"
                    onChange={(e) => this.handleInputChange(e.target.name, e.target.value)}
                    label={" Event date & time"}
                    value={this.state.start}
                    autoComplete="off"
                />
            </DialogForm>
        );
    }
}

export default EventDetailsForm;
