type ButtonIconProps = {
    onClick: () => void;
    icon: string;
    className?: string;
    text?: string;
    disabled?: boolean;
}

function ButtonIcon({onClick, icon,text, className , disabled = false}: ButtonIconProps) {
    const Shape = "border border-gray-200 p-5 drop-shadow-xl rounded-3xl "
    return (
        <button onClick={onClick} disabled={disabled}
             className={`flex items-center gap-0 justify-center ${className} ${Shape} w-[40%] text-wrap max-laptop:w-full`}>
            <h2
                className={`font-exo text-xl`}>{text}</h2>
            <img className={"max-w-6 aspect-square"} src={icon} alt={"arrow right"}/>
        </button>
    );
}

export default ButtonIcon;