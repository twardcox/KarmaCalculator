import {
    withStyles,
    FormGroup,
    FormControlLabel,
    Switch
} from "@material-ui/core";
import * as React from "react";
import PropTypes from 'prop-types';

const styles = (theme) => ({
    formGroup: {
        overflow: "hidden"
    },
    colorSwitchBase: {
        color: theme.palette.primary.main,
        "&$colorChecked": {
            color: theme.palette.primary.dark,
            "& + $colorBar": {
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    colorBar: {},
    colorChecked: {}

});

class SwitchComponent extends React.Component {
    render() {
        const { children, classes, label, ...props } = this.props;
        return (
            <FormGroup className={classes.formGroup} row>
                <FormControlLabel
                    control={
                        <Switch
                            {...props}
                            classes={{switchBase: classes.colorSwitchBase, checked: classes.colorChecked, bar: classes.colorBar}}
                        />
                    }
                    label={label}
                    labelPlacement="start"
                />
            </FormGroup>
        );
    }
}

SwitchComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired
}

export default withStyles(styles)(SwitchComponent);
