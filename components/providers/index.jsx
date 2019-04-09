import * as React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "../themes/unloop";
import UserContextProvider from "./UserContextProvider";

export { default as UserContextProvider } from "./UserContextProvider";
export * from "./UserContextProvider";

export const ProviderWrapper = (props) => {
    const { children } = props;

    const results = document.cookie.match('(^|[^;]+)\\s*user-context\\s*=\\s*([^;]+)');
    const context = results ? JSON.parse(results.pop()) : null;

    return (
        <MuiThemeProvider theme={Theme}>
            <UserContextProvider user={context}>
                {children}
            </UserContextProvider>
        </MuiThemeProvider>
    );
}
