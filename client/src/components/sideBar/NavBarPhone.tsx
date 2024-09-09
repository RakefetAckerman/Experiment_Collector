import {useState} from "react";

import CardNavBar from "./CardNavBar.tsx";

function NavBarPhone() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    function collapseNavBar() {
        setIsCollapsed(!isCollapsed);
    }
    return (
        <header className={` drop-shadow-lg rounded-b-3xl absolute p-3  bg-white w-full ${isCollapsed ? "w-max" : "w-full"}  z-10`}>
            <img onClick={()=>collapseNavBar()} src={"/menu_icon.svg"} className={"transition-all duration-300 w-10 aspect-square "} alt={"menu"} />
            <div className={"w-full flex flex-col gap-4 items-center justify-center"}>
                <CardNavBar to={"/"} className={`${isCollapsed ? "hidden opacity-0" : "opacity-100"}`} title="Home" img="home_icon.svg" isCollapsed={false}/>
                <CardNavBar to={"/experiments"} className={`${isCollapsed ? "hidden opacity-0" : "opacity-100"}`} title="Experiments" img="experiment_icon.svg" isCollapsed={false}/>
                <CardNavBar to={"/editor"} className={`${isCollapsed ? "hidden opacity-0" : "opacity-100"} mb-5`} title="Editor" img="editor_icon.svg" isCollapsed={false}/>
            </div>
        </header>
    );
}

export default NavBarPhone;