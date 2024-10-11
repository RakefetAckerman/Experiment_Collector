import {useSelector} from "react-redux";
import {RootState} from "../../states/store.ts";

type LogoProps = {
    className?: string,
    isCollapsed:boolean,
}


function LogoNavBar({ className , isCollapsed}: LogoProps) {

    const user = useSelector((state:RootState ) => (state.user.user))
    let userName = "";
    if (user) {
        userName = user.username || "";
    }
    return (
        <div className={`${className} gap-4 flex flex-col items-center justify-center w-max`}>
            <div className={`transition-all duration-300 border-black border border-solid ${isCollapsed ? "w-14" : "w-36"} aspect-square rounded-full bg-background-grey flex items-center justify-center`}>
                <img src={"/logo.svg"} className="w-1/2" alt=""/>
            </div>
            {!isCollapsed &&
                <h2 className={`font-exo font text-[15px] uppercase font-medium truncate max-w-[20ch]`}>{userName}</h2>}
        </div>
    );
}

export default LogoNavBar;