import icon from "../../assets/icon_try.svg"

function ToastIdle() {
    return (
        <div className={"w-full h-full absolute bg-transparent z-10 top-0 left-0 flex items-center justify-center"}>
            <div
                className={"p-10 flex justify-center flex-col gap-5 items-center drop-shadow-xl max-w-80 w-1/3 aspect-square border-red-500 border-4  bg-white rounded-3xl"}>
                <h2 className={"font-exo text-clamping-mid text-center text-wrap"}>You've been inactive for some time.</h2>
                <h2 className={"font-exo text-clamping-sm text-center text-black-half text-wrap"}>Please interact with the system to continue your session.</h2>
                <img src={icon} alt={"icon idle"} className={"center-absolute w-1/2 aspect-square opacity-20 -z-10"}/>
            </div>
        </div>
    );
}

export default ToastIdle;