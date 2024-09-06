import {useState} from "react";
import LogoNavBar from "./LogoNavBar.tsx";
import CardNavBar from "./CardNavBar.tsx";
function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    function closeSideBar() {
        setIsCollapsed(!isCollapsed);
    }
    return (
        <aside className={`transition-all duration-300 flex justify-between items-center flex-col pt-4 bg-white h-dvh  ${isCollapsed ? "w-28" : "w-80"} relative`}>
            <div className={`flex justify-center items-center flex-col w-full gap-4`}>
                <LogoNavBar isCollapsed={isCollapsed} userName="Username"/>
                <CardNavBar to={"/"} title="Home" img="home_icon.svg" isCollapsed={isCollapsed}/>
                <CardNavBar to={"/experiments"} title="Experiments" img="experiment_icon.svg" isCollapsed={isCollapsed}/>
                <CardNavBar to={"/editor"} title="Editor" img="editor_icon.svg" isCollapsed={isCollapsed}/>
            </div>
            <div className={"w-full mb-6 flex justify-center items-center"}>
                <CardNavBar to={"/editor"} title="Editor" img="editor_icon.svg" isCollapsed={isCollapsed}/>
            </div>
            <img src={"/back_icon.svg"} onClick={()=>closeSideBar()} className={`${isCollapsed ? "rotate-180" : ""} rounded-full transition-all duration-200 hover:bg-buttons-blue active:scale-110 absolute top-1/2 right-3`} alt="image of a arrow"/>

        </aside>
    );
}

export default SideBar;
