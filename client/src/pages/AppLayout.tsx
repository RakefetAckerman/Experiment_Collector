import {Outlet} from "react-router-dom";
import SideBar from "../components/sideBar/SideBar.tsx";
function AppLayout() {
    return (
        <div className="flex flex-row">
            <SideBar />
            <Outlet/>
        </div>
    );
}

export default AppLayout;