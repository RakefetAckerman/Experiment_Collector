import {useSelector} from "react-redux";
import {RootState} from "../../states/store.ts";
import {matchPath, Navigate, Outlet, useLocation} from "react-router-dom";

function ProtectedRoutes() {
    const user = useSelector((state:RootState ) => (state.user.user))
    const location = useLocation();

    const isExperiment = matchPath("/experiment/:experiment_name", location.pathname);

    if (isExperiment){
        return (user? <Outlet/> : <Navigate to={"/signup"} state={{ from: location }} /> );

    }
    return (user? <Outlet/> : <Navigate to={"/login/researcher"} state={{ from: location }} /> );
}


export default ProtectedRoutes;