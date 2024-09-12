import {useState} from "react";
import home_icon from "../../assets/home_icon.svg"
import experiment_icon from "../../assets/experiment_icon.svg"
import editor_icon from "../../assets/editor_icon.svg"
import logout_icon from "../../assets/logout_icon.svg"
import menu_icon from "../../assets/menu_icon.svg"

import CardNavBar from "./CardNavBar.tsx";

function NavBarPhone() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    function collapseNavBar() {
        setIsCollapsed(!isCollapsed);
    }
    return (
        <header className={` drop-shadow-lg rounded-b-3xl absolute p-3  bg-white w-full ${isCollapsed ? "w-max" : "w-full"}  z-10`}>
            <img onClick={()=>collapseNavBar()} src={menu_icon} className={"transition-all duration-300 w-10 aspect-square "} alt={"menu"} />
            <div className={"w-full flex flex-col gap-4 items-center justify-center"}>
                <CardNavBar to={"/"} className={`${isCollapsed ? "hidden opacity-0" : "opacity-100"}`} title="Home" img={home_icon} isCollapsed={false}/>
                <CardNavBar to={"/experiment"} className={`${isCollapsed ? "hidden opacity-0" : "opacity-100"}`} title="Experiments" img={experiment_icon} isCollapsed={false}/>
                <CardNavBar to={"/editor"} className={`${isCollapsed ? "hidden opacity-0" : "opacity-100"} `} title="Editor" img={editor_icon} isCollapsed={false}/>
                <CardNavBar to={"/logout"} className={`${isCollapsed ? "hidden opacity-0" : "opacity-100"} mb-5`} title="Logout" img={logout_icon} isCollapsed={false}/>

            </div>
        </header>
    );
}

export default NavBarPhone;