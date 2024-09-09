import {useState} from "react";

import CardNavBar from "../sideBar/CardNavBar.tsx";

function NavBarPhone() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    function collapseNavBar() {
        setIsCollapsed(!isCollapsed);
    }
    return (
        <header className={`transition-all duration-300 drop-shadow-lg rounded-b-3xl absolute p-3  bg-white w-full ${isCollapsed ? "bg-transparent" : "bg-white"}  z-10`}>
            <img onClick={()=>collapseNavBar()} src={"/menu_icon.svg"} className={"transition-all duration-300  w-10 aspect-square "} alt={"menu"} />
            <div className={"w-full flex flex-col gap-4 items-center justify-center"}>
                <CardNavBar to={"/"} className={`${isCollapsed ? "opacity-0" : "opacity-100"}`} title="Home" img="home_icon.svg" isCollapsed={false}/>
                <CardNavBar to={"/experiments"} className={`${isCollapsed ? "opacity-0" : "opacity-100"}`} title="Experiments" img="experiment_icon.svg" isCollapsed={false}/>
                <CardNavBar to={"/editor"} className={`${isCollapsed ? "opacity-0" : "opacity-100"} mb-5`} title="Editor" img="editor_icon.svg" isCollapsed={false}/>
            </div>
        </header>
    );
}

export default NavBarPhone;