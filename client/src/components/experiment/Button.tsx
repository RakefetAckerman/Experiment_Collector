type ButtonProps = {
    children?: string;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

function Button({onClick, children, className , disabled = false}: ButtonProps) {
    const objectCss = "max-laptop:w-full max-w-[300px]  p-4 grow transition-all border border-gray-300 drop-shadow-xl duration-300 rounded-xl"
    return (
        <button disabled={disabled} onClick={onClick} className={`${objectCss} text-wrap ${className}`}>{children}</button>
    );
}

export default Button;

