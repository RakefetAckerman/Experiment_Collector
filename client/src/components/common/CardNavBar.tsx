import {NavLink} from "react-router-dom";

type CardNavBarProps = {
    className?: string,
    img?: string,
    isCollapsed: boolean,
    title?: string,
    to: string
}

function CardNavBar({img, to, title, isCollapsed}: CardNavBarProps) {
    const tailWindStyleNavLink = `transition-all duration-200 hover:bg-buttons-blue active:scale-110 p-3 rounded-xl gap-6 w-[90%]   ${isCollapsed ? "relative": "flex flex-row items-center justify-start"} border-black border border-solid drop-shadow `;
    return (
        <NavLink to={to} className={({ isActive }) => `${tailWindStyleNavLink} ${isActive ?  ' bg-buttons-blue' : 'bg-button-grey'}`}>
            {img && <img src={img} className={`${isCollapsed && "center-absolute"} w-[35px]`} alt=""/>}
            {<h2 className={`font-exo font text-lg font-medium transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : "opacity-100 w-auto"}`}>{title}</h2>}
        </NavLink>

    );
}

export default CardNavBar;