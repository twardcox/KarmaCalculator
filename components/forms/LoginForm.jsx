import * as React from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Page from "../layout/Page";
import Section from "../layout/Section";
import EventDetailsForm from "../forms/EventDetailsForm";
import EventTable from "../tables/EventTable"
import ResponsiveDialog from "../layout/ResponsiveDialog";
import DialogErrorTitle from "../layout/DialogErrorTitle";
import { ProviderWrapper } from "../providers";
import DialogForm from "../layout/DialogForm";
import FormField from "../forms/FormField";
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(name, value) {
        this.setState({[name]: value});
    }

    render() {
        const {saving, redirect, ...props} = this.props;

        const actions = [
            {
                label: "Sign In",
                formAction: "submit",
                color: "primary",
                loading: saving
            }
        ];

        props.autoComplete = "off";
        props.actions = actions;

        return (
            <DialogForm {...props} method="POST">
                <FormField>
                    <input type="hidden" name="redirect" value={redirect} />
                    <TextValidator
                        id="username"
                        name="username"
                        placeholder="you@example.com"
                        label="e-mail"
                        onChange={ (e) => this.handleInputChange(e.target.name, e.target.value)}
                        margin="dense"
                        validators={['required', 'isEmail']}
                        errorMessages={['enter your username', 'not a valid email address']}
                        withRequiredValidator={true}
                        value={this.state.username}
                        autoComplete="off"
                        autoFocus />
                </FormField>
                <FormField>
                    <TextValidator
                            id="password"
                            name="password"
                            label="Password"
                            onChange={ (e) => this.handleInputChange(e.target.name, e.target.value)}
                            margin="dense"
                            validators={['required']}
                            errorMessages={['enter your password']}
                            withRequiredValidator={true}
                            value={this.state.password}
                            autoComplete="off"
                            type="password" />
                </FormField>
            </DialogForm>
        );

    }
}

export default LoginForm;
