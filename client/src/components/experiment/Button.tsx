type ButtonProps = {
    children?: string;
    className?: string;
    onClick: () => void;
    disabled?: boolean;
}

/**
 * Button for the experiments the button has as default
 * Gray border ,flex auto , shadow, every transition with 300 ms duration ,
 * padding ,text wrapping and max-w-[300px].
 * @param onClick onClick method
 * @param children the text string inputted as children
 * @param className the css styling
 * @param disabled is the button disabled or not - boolean
 */
function Button({onClick, children, className, disabled = false}: ButtonProps) {
    const objectCss = "max-w-[300px] max-laptop:max-w-[300px] flex-auto p-4 grow transition-all border border-gray-300 drop-shadow-xl duration-300 rounded-xl text-clamping-sm"
    return (
        <button disabled={disabled} onClick={onClick}
                className={`${objectCss} ${className} w-full whitespace-normal break-words text-pretty`}>{children}</button>
    );
}

export default Button;

