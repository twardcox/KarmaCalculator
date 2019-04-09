import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Fade } from "@material-ui/core";
import Progress from "./Progress"


const styles = (theme) => ({
    icon: {
        marginLeft: Math.floor(theme.spacing.unit / 4),
        fontSize: "small"
    },
    container: {
        display: "inline-block",
        position: "relative"
    }
})

const iconButton = (props) => {
    const {classes, loading, icon: Icon, ...remainder} = props;
    return <div className={classes.container}>
                <Button {...remainder}>
                    {props.children}
                    {Icon && <Icon className={classes.icon}/>}
                    <Fade
                        in={loading}
                        style={{
                            transitionDelay: loading ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <Progress size={16} variant="overlay" />
                    </Fade>
                </Button>
            </div>
}

export default withStyles(styles)(iconButton)
