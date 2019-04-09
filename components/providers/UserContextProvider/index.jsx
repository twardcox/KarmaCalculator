import * as React from "react";
import PropTypes from 'prop-types';
import UserContext from "./UserContext"
import withUserContext from "./withUserContext"

function UserContextProvider(props) {
    const {children, user} = props;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default UserContextProvider;
export { UserContext, withUserContext };
