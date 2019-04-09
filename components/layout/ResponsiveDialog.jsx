import * as React from "react";
import { Dialog, withMobileDialog } from "@material-ui/core";
import PropTypes from 'prop-types';

class ResponsiveDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, error, title, actions, children, disabled, ...props } = this.props;
        return (
            <Dialog {...props} maxWidth="xs" >
                    {children}
            </Dialog>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog({breakpoint: 'xs'})(ResponsiveDialog);;
