import {Outlet} from "react-router-dom";
function AppLayout() {
    return (
        <div className="flex flex-row">
            <Outlet/>
        </div>
    );
}

export default AppLayout;