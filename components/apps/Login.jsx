import * as React from "react";
import { withStyles, Avatar, Grid, Typography } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Page from "../layout/Page";
import ResponsiveDialog from "../layout/ResponsiveDialog";
import DialogErrorTitle from "../layout/DialogErrorTitle";
import { ProviderWrapper } from "../providers";
import LoginForm from "../forms/LoginForm";

const styles = (theme) => ({
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
    }
});

class Login extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <Page>
                <ResponsiveDialog open={true}>
                    <DialogErrorTitle>
                        <Grid container justify="flex-start" alignItems="center" spacing={8}>
                            <Grid item>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography variant="h5">
                                Sign In
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogErrorTitle>
                    <LoginForm redirect={this.props.redirect} />

                </ResponsiveDialog>

            </Page>
        )
    }
}

const StyledLogin = withStyles(styles)(Login);

// Keep providers outside of a control that changes state
// so that the theme doesn't re-render
export default (props) =>
    <ProviderWrapper>
        <StyledLogin {...props} />
    </ProviderWrapper>

