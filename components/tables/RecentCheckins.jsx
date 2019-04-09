import * as React from "react";
import { withStyles, Typography } from "@material-ui/core";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PropTypes from "prop-types";
import timeAgo from "node-time-ago";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Progress from "../widgets/Progress";

const styles = (theme) => ({
    root: {
        [theme.breakpoints.down("sm")]: {
            margin: 0,
            borderRadius: 0,
            padding: theme.spacing.unit
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing.unit * 4,
            marginBottom: theme.spacing.unit * 2,
            marginLeft: theme.spacing.unit * 2,
            marginRight: theme.spacing.unit * 2,
            padding: theme.spacing.unit * 2,
            borderRadius: 5
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 4,
            marginLeft: theme.spacing.unit * 4,
            marginRight: theme.spacing.unit * 4,
            padding: theme.spacing.unit * 4,
            borderRadius: 5
        }
    },
    gridList: {
        margin: 0
    },
    item: {
        marginBottom: theme.spacing.unit * 2,
        whiteSpace: "nowrap",
        "&:nth-child(4)": {
            WebkitMaskImage:
                "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,.5)))"
        },
        "&:nth-child(5)": {
            WebkitMaskImage:
                "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,.5)), to(rgba(0,0,0,0)))"
        }
    },
    chip: {
        [theme.breakpoints.down("sm")]: {
            marginLeft: theme.spacing.unit
        },
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing.unit * 3
        }
    },
    span: {
        color: theme.palette.primary.main,
        fontSize: ".6em",
        marginLeft: theme.spacing.unit
    }
});

class RecentCheckins extends React.Component{
    render() {
        const { classes } = this.props;
        return (
            <ExpansionPanel className={classes.root} defaultExpanded={true}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h4">Recent Checkins</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    { this.props.loading ? <Progress color="secondary"><Typography>loading...</Typography></Progress> :
                    <GridList cols={1} className={classes.gridList}>
                        {this.props.checkins.map((object, i) => (
                            <GridListTile className={classes.item} key={object.name + object.time} style={{ height: 'auto', padding: 'auto' }}>
                                <span>{object.name}</span>
                                <span color="primary" className={classes.span}>{timeAgo(object.checkin)}</span>

                            </GridListTile>
                        ))}

                    </GridList>
                    }
                </ExpansionPanelDetails>
        </ExpansionPanel>
        );
    }
}

RecentCheckins.propTypes= {
    checkins: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        checkin: PropTypes.string.isRequired
    }))
}

export default withStyles(styles)(RecentCheckins);
