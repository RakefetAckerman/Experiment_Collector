type ButtonIconProps = {
    onClick: () => void;
    icon: string;
    className?: string;
    text?: string;

}

function ButtonIcon({onClick, icon,text, className}: ButtonIconProps) {
    const Shape = "border border-gray-200 p-5 drop-shadow-xl rounded-3xl"
    const Location = "absolute right-0 bottom-0 m-8"

    return (
        <div onClick={onClick}
             className={`active:scale-110 max-w-40 flex items-center gap-0 justify-center ${className} ${Shape} ${Location}`}>
            <h2
                className={`font-exo text-xl `}>{text}</h2>
            <img className={"max-w-6 aspect-square"} src={icon} alt={"arrow right"}/>
        </div>
    );
}

export default ButtonIcon;