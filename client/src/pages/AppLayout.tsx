import {Outlet} from "react-router-dom";
import SideBar from "../features/SideBar/SideBar.tsx";
import useViewportWidth from "../hooks/useViewWidth.ts";
import {LAPTOP_SIZE} from "../utils/constants.ts";
import NavBarPhone from "../features/SideBar/NavBarPhone.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../states/globalStore.ts";
import UserRoles from "../utils/UserRoles.ts";

function AppLayout() {
    const width = useViewportWidth();
    const user = useSelector((state:RootState ) => (state.user.user))

    return (
        <div className="flex max-tablet:flex-col tablet:flex-row ">
            {user!.role==UserRoles.Researcher &&  (width < LAPTOP_SIZE ?<NavBarPhone/> :<SideBar/> )}
            <div className="w-full h-dvh bg-background-grey">
                <Outlet/>
            </div>
        </div>
    );
}

export default AppLayout;