import React, {Dispatch, ReactNode, SetStateAction} from 'react';
import closeIcon from "../../assets/close.svg";

type Props = {
    isOpen: boolean;
    children: ReactNode;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * A popover that allows to send a popup to the page
 * @param isOpen a react boolean that should be a boolean state.
 * @param children the ReactNode child's
 * @param setIsOpen setter method for the close button
 */
function PopOver({isOpen, children, setIsOpen}: Props) {
    if (!isOpen) {
        return null;
    }

    return (

        <div
            className={"z-10 flex items-center justify-center min-h-[300px] center-absolute min-w-[450px] border-2 border-gray-100 drop-shadow-xl rounded-3xl bg-white p-5"}>
            {children}
            <img alt={"Close"}
                 id={"close_button"}
                 src={closeIcon}
                 className={"transition-all duration-300 absolute top-4 right-4 opacity-50 hover:opacity-100 active:scale-110 z-10"}
                 width={30}
                 height={30}
                 onClick={() => (setIsOpen(false))}/>
        </div>
    );
}

export default PopOver;