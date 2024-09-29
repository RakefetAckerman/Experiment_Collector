import {Outlet} from "react-router-dom";
import SideBar from "../components/sideBar/SideBar.tsx";
import useViewportWidth from "../hooks/useViewWidth.ts";
import {LAPTOP_SIZE} from "../utils/constants.ts";
import NavBarPhone from "../components/sideBar/NavBarPhone.tsx";

function AppLayout() {
    const width = useViewportWidth()
    return (
        <div className="flex max-tablet:flex-col tablet:flex-row ">
            {width < LAPTOP_SIZE ?<NavBarPhone/> :<SideBar/>}
            <div className="w-full h-dvh bg-background-grey">
                <Outlet/>
            </div>
        </div>
    );
}

export default AppLayout;