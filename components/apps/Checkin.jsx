import axios from "axios";
import * as React from "react";
import Prompt from "../widgets/Prompt";
import CheckinDetailForm from "../forms/CheckinDetailsForm"
import RecentCheckins from "../tables/RecentCheckins"
import Section from "../layout/Section";
import ResponsiveDialog from "../layout/ResponsiveDialog"
import DialogErrorTitle from "../layout/DialogErrorTitle"
import Page from "../layout/Page"
import PropTypes from 'prop-types';
import { ProviderWrapper } from '../providers/';

class Checkin extends React.Component {
    constructor(props) {
        super(props);

        this.state = { loading: true, attendee: "", event: { name: ""}, isCheckin: false  };
        this.checkin = this.checkin.bind(this);
        this.saveCheckin = this.saveCheckin.bind(this);
        this.cancelCheckin = this.cancelCheckin.bind(this);
        this.promptChanged = this.promptChanged.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.refreshLatest = this.refreshLatest.bind(this);
    }

    componentDidMount() {
        this.loadEvent();
    }

    loadEvent() {
        axios
            .get(`/api/events/${this.props.eventId}`)
            .then(response => {
                this.setState({ event: response.data, loadError: null });
            }).then( this.refreshLatest,
                () => {
                this.setState({
                        loading: false,
                        loadError: {
                            message:"Failed to retreive event.",
                            errorKey: Date.now(),
                            retry: this.loadEvent.bind(this)
                    }
                });
            });
    }

    refreshLatest() {
        if (!this.state.loading) this.setState({loading: true});

        return axios
            .get(
                `/api/events/${this.props.eventId}/attendees/?top=${this.props.showLast}&key=${
                    this.props.eventId
                }`
            )
            .then(response => {
                let records = (response.data)
                    .slice(0, this.props.showLast)
                    .map(value => {
                        return {name: value.name, checkin: value.checkin};
                    });

                this.setState({ loading: false, latestAttendees: records, loadError: null });
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    loadError: {
                        message:"Failed to retreive checkins.",
                        errorKey: Date.now(),
                        retry: this.refreshLatest.bind(this)
                    }
                })
            })
           ;
    }

    checkin(e, name) {
        e.preventDefault();
        if (name) this.setState({ attendee: name, isCheckin: true });
    }

    async saveCheckin(detail) {
        this.setState({ isSaving: true });
        try {
            let event = this.state.event;
            event.started = true;
            await axios.put(`/api/events/${this.props.eventId}`, event);

            detail["eventId"] = this.props.eventId;
            detail["checkin"] = (new Date()).toISOString();
            await axios.post(`/api/events/${this.props.eventId}/attendees/`, detail);
            this.setState({ attendee: "", isCheckin: false, isSaving: false, event: event });

            this.refreshLatest(); //don't need to await
        } catch (ex) {
            this.setState({ saveError: { message: ex.message, errorKey: Date.now() }, isSaving: false });
        }
    }

    promptChanged(e, value) {
        this.setState({ attendee: value });
    }

    cancelCheckin() {
        this.setState({saveError: null, attendee: "", isCheckin: false });
    }

    handleClose(e) {
        if (!this.state.isSaving) {
            this.setState({ saveError: null, isCheckin: false });
        }
    }

    render() {
        return (
            <Page title={this.state.event.name}>
                <Section error={this.state.loadError}>
                    <Prompt
                            value={this.state.attendee}
                            prompt="Enter your name..."
                            label="Name"
                            action="Check-In"
                            onComplete={this.checkin}
                            onChange={this.promptChanged}
                            disabled={this.state.loadError && true}
                        >
                            Please check in
                    </Prompt>
                    <ResponsiveDialog
                        open={this.state.isCheckin}
                        onClose={this.handleClose} >
                        <DialogErrorTitle error={this.state.saveError}>
                            Check In
                        </DialogErrorTitle>
                        <CheckinDetailForm
                            eventId={this.props.eventId}
                            attendee={this.state.attendee}
                            onCancel={this.cancelCheckin}
                            onSave={this.saveCheckin}
                            disabled={this.state.isSaving}
                            saving={this.state.isSaving}
                        />
                    </ResponsiveDialog>
                </Section>
                    {
                    (this.state.loading || (this.state.latestAttendees && this.state.latestAttendees.length !== 0)) &&
                        <RecentCheckins
                            checkins={this.state.latestAttendees}
                            loading={this.state.loading}
                        />
                    }
            </Page>
        );
    }
}

Checkin.propTypes = {
    showLast: PropTypes.number.isRequired,
    eventId: PropTypes.string.isRequired
}

// Keep MuiThemeProvider outside of a control that changes state
// so that the theme doesn't re-render
export default (props) =>
        <ProviderWrapper>
            <Checkin {...props} />
        </ProviderWrapper>
