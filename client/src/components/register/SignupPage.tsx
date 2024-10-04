import {FormEvent, useState} from 'react';
import icon from "../../assets/pen.svg";
import Button from "../experiment/Button.tsx";
import {toast, ToastContainer} from "react-toastify";
import "./register.css"
import {handleRegisterInputError} from "../../error/userInputErrorHandling.ts";
import {UserBoundary} from "../../bounderies/user/UserBoundary.ts";
import UserRoles from "../../utils/UserRoles.ts";
import {UserIdBoundary} from "../../bounderies/user/UserIdBoundary.ts";
import usersServiceImpl from "../../services/usersServiceImpl.ts";
import Spinner from "../common/Spinner.tsx";
import {AxiosError} from "axios";
import {getErrorData} from "../../utils/helperMethods.ts";
import {useNavigate} from "react-router-dom";
import {PLATFORM_WEBSITE} from "../../utils/constants.ts";


function SignupPage() {
    const initialInput = {
        username:"",
        email:"",
        platform: PLATFORM_WEBSITE,
        role:UserRoles.Participant
    }
    const [input, setInput] = useState(initialInput)

    const initialInputState = {color: "#cfcfcf", shake: false};
    const [inputState, setInputState] = useState(initialInputState);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent default form submission
        const error = handleRegisterInputError(input.username, input.email);
        if (error.isError) {
            setInputState({color: "red", shake: true});
            toast.error(error.errorMessage);
            // reset the state of shake after the animation is over.
            setTimeout(() => {
                setInputState(prevState => ({
                    ...prevState, shake: false
                }));
            }, 500);
            return;
        }

        const ID = new UserIdBoundary(input.platform, input.email);
        const user = new UserBoundary(ID, input.role, {},input.username);
        setIsLoading(true);
        await usersServiceImpl.createUser(user).catch((error: AxiosError) => {
            toast.error(getErrorData(error));
            console.log(error)
        }).then((successRes) => {
            if (!successRes) {
                return;
            }
            toast.success("created user successfully.");
            setTimeout(() => {
                navigate("/login");
            }, 200)
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        })
    }

    const spinnerContainerCss = "center-absolute z-10 bg-white  border-gray-200 border w-[30vmin] shadow-2xl aspect-square rounded-3xl flex justify-center items-center"
    return (
        <>
            <div className={`${isLoading ? "" : "hidden"} ${spinnerContainerCss}`}>
                <Spinner/>
            </div>

            <ToastContainer autoClose={3000}/>
            <div className={"w-dvw h-dvh flex bg-background-grey items-center justify-center"}>
                <form onSubmit={handleSubmit} className={` ${inputState.shake ? 'shake' : ''} gap-5 max-w-[500px] w-9/12 flex flex-col 
                items-center justify-center p-10 bg-white drop-shadow-xl border rounded-2xl`}
                      style={{borderColor: inputState.color}}
                >
                    <img src={"logo.svg"} alt={"Logo Image"} className={"w-28 m-5 drop-shadow-lg"}/>
                    <div
                        className={`transition-all duration-100 p-4 border flex flex-row w-[80%] rounded-2xl shadow-md`}
                    >
                        <img src={icon} className={"w-9 p-1 drop-shadow-md"} alt={"icon of pencil"}/>
                        <input
                            className={"w-full p-2 h-10 ml-2 text-clamping-sm font-exo"}
                            type={"text"}
                            id={"username"}
                            value={input.username}
                            onChange={(e) => setInput(prevState => ({...prevState, username: e.target.value}))}
                            placeholder={"Username"}
                        />
                    </div>
                    <div
                        className={`transition-all duration-100 p-4 border flex flex-row w-[80%] rounded-2xl shadow-md`}>
                        <img src={icon} className={"w-9 p-1 drop-shadow-md"} alt={"icon of pencil"}/>
                        <input
                            className={"w-full h-10 p-2 ml-2 text-clamping-sm font-exo"}
                            type={"email"}
                            id={"email"}
                            value={input.email}
                            onChange={(e) => setInput(prevState => ({...prevState, email: e.target.value}))}
                            placeholder={"Email"}
                        />
                    </div>

                    <Button disabled={isLoading}
                            className={"hover:bg-buttons-blue shadow-md hover:shadow-xl m-10 active:scale-110 w-[60%]"}>
                        Register
                    </Button>
                </form>
            </div>
        </>
    );
}

export default SignupPage;