import * as React from "react";
import { TextField, Button, FormControl, Grid } from "@material-ui/core";
import PropTypes from 'prop-types';

class Prompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: ""};
        this.completePrompt = this.completePrompt.bind(this);
        this.promptChanged = this.promptChanged.bind(this);
    }

    completePrompt(e) {
        e.preventDefault();

        this.props.onComplete && this.props.onComplete(e, this.state.value);
    }

    promptChanged(e) {
        e.preventDefault();

        const promptValue = e.currentTarget.value;
        this.setState({value: promptValue});

        this.props.onChange && this.props.onChange(e, promptValue);
    }

    render() {
        return (
            <div>
                <header>{this.props.children}</header>
                <main>
                    <Grid container justify="flex-start" alignItems="flex-end" spacing={16}>

                        <Grid item>
                            <TextField
                                label={this.props.prompt}
                                onChange={this.promptChanged}
                                value={this.props.value}
                                disabled={this.props.disabled}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.completePrompt}
                                disabled={this.props.disabled}
                            >
                                {this.props.action}
                            </Button>
                        </Grid>
                    </Grid>

                </main>
            </div>
        );
    }
}

Prompt.propTypes = {
    prompt: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onComplete: PropTypes.func,
    onChange: PropTypes.func
}

export default Prompt;
