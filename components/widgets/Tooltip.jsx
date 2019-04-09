import * as React from "react";
import { Tooltip } from "@material-ui/core";


class CustomTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }

        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onOpen(e) {
        e.preventDefault();
        this.setState({ open: true });

        this.props.onOpen && this.props.onOpen(e);
    }

    onClose(e) {
        e.preventDefault();
        this.setState({ open: false });

        this.props.onClose && this.props.onClose(e);
    }

    render() {
        let {children, onClose, onOpen, open, enterDelay, leaveDelay, canOpen, ...remainder} = this.props;
        if (enterDelay === undefined) enterDelay = 500;
        if (leaveDelay === undefined) leaveDelay = 200;

        let calculatedOpen = open !==undefined ? open : this.state.open;
        if (this.props.canOpen !== undefined) calculatedOpen = calculatedOpen && Boolean(this.props.canOpen);

        return (
            <Tooltip
                {...remainder}
                open={calculatedOpen}
                onOpen={this.onOpen}
                onClose={this.onClose}
                enterDelay={enterDelay}
                leaveDelay={leaveDelay}>
                {children}
            </Tooltip>
        )
    }
}

export default CustomTooltip;
