import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../states/store.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import UserRoles from "../../utils/UserRoles.ts";

function ProtectedResearcher() {
    const user = useSelector((state: RootState) => (state.user.user))
    const location = useLocation();

    return (user!.role === UserRoles.Researcher ? <Outlet/> : <Navigate to={"/login/researcher"} state={{from: location}}/>);
}

export default ProtectedResearcher;