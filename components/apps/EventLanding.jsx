import * as React from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import Page from "../layout/Page";
import Section from "../layout/Section";
import EventDetailsForm from "../forms/EventDetailsForm";
import EventTable from "../tables/EventTable"
import ResponsiveDialog from "../layout/ResponsiveDialog";
import DialogErrorTitle from "../layout/DialogErrorTitle";
import { ProviderWrapper } from "../providers";

class EventLanding extends React.Component {
    constructor(props) {
        super(props);

        this.state = {loading: true, editing:false };

        this.saveEvent = this.saveEvent.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.launchCheckin = this.launchCheckin.bind(this);
        this.editEvent = this.editEvent.bind(this);
    }

    componentDidMount() {
        this.refreshLatest();
    }

    refreshLatest() {
        if (!this.state.loading) this.setState( {loading: true });

        return axios
            .get('/api/events')
            .then(response => {
                let records = (response.data)
                    .map( ({name, start, eventId, started }) => ({ name, start, eventId, started }));

                this.setState({ events: records, loading: false, loadError: null });
            })
            .catch(() => {
                this.setState({ loadError: { message: "Failed to retrieve events.", errorKey: Date.now(), retry: this.refreshLatest.bind(this)}, loading: false });
            });
    }

    async saveEvent(detail) {
        this.setState({ isSaving: true });

        let action = detail.eventId ?
            axios.put(`/api/events/${detail.eventId}`, detail) :
            axios.post(`/api/events`, detail);

        action.then(
            () => {
                this.setState({ saveError: null, isSaving: false, editing: false});
                this.refreshLatest();
            },
            (err) => {
                this.setState({ saveError: {message: err.message, errorKey: Date.now() }, isSaving: false });
            }
        );
    }

    launchCheckin(eventId) {
        window.location.href = `./check-in?eventId=${eventId}`;
    };

    cancelEdit() {
        this.setState({ saveError: null, editing: false });
    }

    editEvent(event) {
        this.setState( {editing: true, editEvent: event ? event : {}});
    }

    render() {
        return (
            <Page title={"Unloop Events"}>
                <Section error={ this.state.loadError }>
                    <Grid container direction="column" justify="flex-start">
                        <Grid item>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            this.setState({ editing: true });
                                        }}
                                        disabled={this.state.loading || (this.state.loadError && true) }
                                    >
                                        create event
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <EventTable
                                data={this.state.events}
                                launchCheckIn={this.launchCheckin}
                                editEvent={this.editEvent}
                                loading={this.state.loading}
                            />
                        </Grid>
                    </Grid>
                </Section>

                <ResponsiveDialog
                    open={this.state.editing}
                    onClose={this.cancelEdit}>
                    <DialogErrorTitle error={this.state.saveError} >
                        New Event
                    </DialogErrorTitle>

                    <EventDetailsForm
                        onCancel={this.cancelEdit}
                        onSubmit={this.saveEvent}
                        disabled={this.state.isSaving}
                        event={this.state.editEvent}
                        saving={this.state.isSaving}
                    />
                </ResponsiveDialog>
            </Page>
        );
    }
}

// Keep providers outside of a control that changes state
// so that the theme doesn't re-render
export default (props) =>
    <ProviderWrapper>
        <EventLanding {...props} />
    </ProviderWrapper>

