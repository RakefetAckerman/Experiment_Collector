import {useState} from "react";
import {USERNAME_TEXT} from "../../utils/constants.ts";
import LogoNavBar from "./LogoNavBar.tsx";
import CardNavBar from "./CardNavBar.tsx";
import home_icon from "../../assets/home_icon.svg"
import experiment_icon from "../../assets/experiment_icon.svg"
import editor_icon from "../../assets/editor_icon.svg"
import logout_icon from "../../assets/logout_icon.svg"
import back_icon from "../../assets/back_icon.svg"

function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    function collapseSideBar() {
        setIsCollapsed(!isCollapsed);
    }


    return (
        <aside className={`border-gray-300 border-solid border transition-all duration-300 flex justify-between items-center flex-col pt-4 bg-white h-dvh  ${isCollapsed ? "w-32" : "w-96"} relative`}>
            <div className={`flex justify-center items-center flex-col w-full gap-4`}>
                <LogoNavBar isCollapsed={isCollapsed} className={""} userName={USERNAME_TEXT}/>
                <CardNavBar to={"/"} title="Home" img={home_icon} isCollapsed={isCollapsed}/>
                <CardNavBar to={"/experiment"} title="Experiments" img={experiment_icon} isCollapsed={isCollapsed}/>
                <CardNavBar to={"/editor"} title="Editor" img={editor_icon} isCollapsed={isCollapsed}/>
            </div>
            <div className={"w-full mb-6 flex justify-center items-center"}>
                <CardNavBar to={"/logout"} title="Logout" img={logout_icon} isCollapsed={isCollapsed}/>
            </div>
            <img src={back_icon} onClick={()=>collapseSideBar()} className={`${isCollapsed ? "rotate-180" : ""} p-2 w-9 border-gray-300 border-solid border rounded-full transition-all duration-200 hover:bg-buttons-blue active:scale-110 absolute top-1/2 right-3`} alt="image of a arrow"/>

        </aside>
    );
}

export default SideBar;
