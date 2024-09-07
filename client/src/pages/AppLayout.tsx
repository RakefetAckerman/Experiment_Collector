import {Outlet} from "react-router-dom";
import SideBar from "../components/sideBar/SideBar.tsx";

function AppLayout() {
    return (
        <div className="flex flex-row">
            <SideBar/>
            <div className="w-full h-dvh bg-background-grey">
                <Outlet/>
            </div>
        </div>
    );
}

export default AppLayout;