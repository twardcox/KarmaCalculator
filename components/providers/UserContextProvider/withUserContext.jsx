import * as React from "react"
import useUserContext from "./useUserContext"
import hoistNonReactStatics from "hoist-non-react-statics"

export default (Component) =>
{
    let WithUserContext = React.forwardRef((props, ref) => {
        const user = useUserContext();
        return <Component ref={ref} user={user} {...props} />
    });

    hoistNonReactStatics(WithUserContext, Component);

    return WithUserContext;
}
