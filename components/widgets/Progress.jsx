import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  containerFill: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerOverlay: {
      position: "absolute",
      top:'50%',
      left: '50%',
      transform: "translate(-50%, -50%)"
  }
});

function CircularIndeterminate(props) {
  const { classes, variant, ...remainder } = props;

  return (
    <div className={ variant && variant.toLowerCase() == "overlay" ? classes.containerOverlay : classes.containerFill}>
      <CircularProgress className={classes.progress} {...remainder} />

      {props.children}
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
