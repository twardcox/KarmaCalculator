import * as React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from 'prop-types';

const smallFactor = 2.5; //how many times the theme spacing
const regularFactor = 4;
const largeFactor = 6;

const style = (factor) => {
    return (theme) => ({
        logo: {
            height: Math.round(theme.spacing.unit * factor),
            "margin-right":  Math.floor(Math.round(theme.spacing.unit * factor) / 2)
        }
    });
};

class Logo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <img
                src={`/image/unloop_${this.props.type}_${this.props.color}.png`}
                className={classes.logo}
            />
        );
    }
}

const colors = ["black", "white", "teal"];
export const LogoColor = (([Black, White, Teal]) => ({Black, White, Teal}))(colors);

const types = ["mark", "logo"];
export const LogoType = (([Mark, Logo]) => ({Mark, Logo}))(types);

Logo.propTypes = {
    type: PropTypes.oneOf(types),
    color: PropTypes.oneOf(colors)
};

export const SmallLogo = withStyles(style(smallFactor))(Logo);
export const LargeLogo = withStyles(style(largeFactor))(Logo);
export const NormalLogo = withStyles(style(regularFactor))(Logo);
