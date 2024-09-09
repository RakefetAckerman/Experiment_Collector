import {Outlet} from "react-router-dom";
import SideBar from "../components/sideBar/SideBar.tsx";
import useViewportWidth from "../hooks/useViewWidth.ts";
import {TABLET_SIZE} from "../utils/constants.ts";
import NavBarPhone from "../components/common/NavBarPhone.tsx";

function AppLayout() {
    const width = useViewportWidth()
    console.log(width)
    return (
        <div className="flex max-tablet:flex-col tablet:flex-row ">
            {width < TABLET_SIZE ?<NavBarPhone></NavBarPhone> :<SideBar/>}
            <div className="w-full h-dvh bg-background-grey">
                <Outlet/>
            </div>
        </div>
    );
}

export default AppLayout;