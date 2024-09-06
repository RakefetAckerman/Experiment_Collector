type LogoProps = {
    userName?: string,
    className?: string,
    isCollapsed:boolean,
}


function LogoNavBar({userName, className , isCollapsed}: LogoProps) {
    return (
        <div className={`${className} gap-4 flex flex-col items-center justify-center w-max`}>
            <div className={`border-black border border-solid ${isCollapsed ? "w-14" : "w-36"} aspect-square rounded-full bg-background-grey flex items-center justify-center`}>
                <img src={"/logo.svg"} className="w-1/2" alt=""/>
            </div>
            {!isCollapsed &&
                <h2 className={`font-exo font text-[15px] uppercase font-medium `}>{userName}</h2>}
        </div>
    );
}

export default LogoNavBar;