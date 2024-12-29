import {useState} from 'react';

type ToggleSwitchProps = {
    initialState: boolean;
    onToggle: (state: boolean, element: string) => void;
    element?: string;
}
const ToggleSwitch = ({initialState, onToggle, element = ""}: ToggleSwitchProps) => {
    const [isOn, setIsOn] = useState(initialState);
    const handleToggle = () => {
        const newState = !isOn;
        setIsOn(newState);
        onToggle(newState, element);
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors 
                    duration-200 ease-in-out focus:outline-none  ${isOn ? 'bg-blue-600' : 'bg-gray-200'}`}
            role="switch"
            aria-checked={isOn}
        >
            <span className="sr-only">Toggle switch</span>
            <span
                className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full 
          bg-white shadow ring-0 transition duration-200 ease-in-out
          ${isOn ? 'translate-x-6' : 'translate-x-0'}
        `}
            />
        </button>
    );
};

export default ToggleSwitch;