import {NavLink} from "react-router-dom";

type ExperimentCardProps = {
    to: string;
    headline: string;
    image: string;
    text: string;
}

function ExperimentCard({to, headline, image, text}: ExperimentCardProps) {
    const transition = "active:scale-110 transition-all duration-200 hover:bg-buttons-blue"

    return (
        <NavLink to={to}
                 className={`${transition} gap-7 p-5 w-96 min-h-40 bg-white drop-shadow-lg items-center justify-center flex flex-row rounded-3xl`}>
            <div className={"h-[95%] flex flex-col items-center justify-center mt-2 gap-2 w-[55%]"}>
                <h2 className={"font-exo text-clamping-lg self-center w-full font-light"}>{headline}</h2>
                <h3 className={"font-exo text-clamping-sm font-light  w-full truncate"}>{text}</h3>
            </div>
            <img src={image} alt={"icon"} className={"opacity-50 w-20 aspect-square"}/>
        </NavLink>

    );
}

export default ExperimentCard;