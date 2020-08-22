import React from "react"
import { Route, Redirect } from "react-router-dom"
import { getToken } from "../../utils/session"
const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={routeProps => (
                getToken() ? <Component {...routeProps} /> : <Redirect to="/" />//路由重定向
            )}
        />
    );
}
export default PrivateRouter
