import {FormEvent, useState} from 'react';
import {JWT_TOKEN, PLATFORM_WEBSITE} from "../../utils/constants.ts";
import UserRoles from "../../utils/UserRoles.ts";
import Spinner from "../common/Spinner.tsx";
import {toast, ToastContainer} from "react-toastify";
import icon from "../../assets/pen.svg";
import Button from "../experiment/Button.tsx";
import {handleLoginResearcherInputError} from "../../error/userInputErrorHandling.ts";
import {UserIdBoundary} from "../../bounderies/user/UserIdBoundary.ts";
import {UserBoundary} from "../../bounderies/user/UserBoundary.ts";
import usersServiceImpl from "../../services/usersServiceImpl.ts";
import {AxiosError} from "axios";
import {getErrorData} from "../../utils/helperMethods.ts";
import {useDispatch} from "react-redux";
import {setUser, updateToken} from "../../states/user/userSlice.ts";
import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";

function LoginResearcher() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";  // Get the original location, fallback to "/" if not available
    const myCookies = new Cookies();

    const initialInput = {
        email: "",
        password: "",
        platform: PLATFORM_WEBSITE,
        role: UserRoles.Researcher
    }
    const [input, setInput] = useState(initialInput)
    const initialInputState = {color: "#cfcfcf", shake: false};
    const [inputState, setInputState] = useState(initialInputState);
    const [isLoading, setIsLoading] = useState(false);
    const spinnerContainerCss = "center-absolute z-10 bg-white  border-gray-200 border w-[30vmin] shadow-2xl aspect-square rounded-3xl flex justify-center items-center"

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent default form submission
        const error = handleLoginResearcherInputError(input.email, input.password);
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
        const user = new UserBoundary(ID, input.role, {password: input.password}, "");
        setIsLoading(true);

        await usersServiceImpl.login(user).catch((error: AxiosError) => {
            toast.error(getErrorData(error));
        }).then((successRes) => {
            if (!successRes) {
                return;
            }
            toast.success("Login successfully.");
            if (successRes.username) {
                user.updateUserName(successRes.username!)
            }

            const serializedUser = {
                userId: {platform: user.userId.platform, email: user.userId.email},
                role: user.role,
                username: user.username,
            }
            const token = myCookies.get(JWT_TOKEN);

            // Ensure expiryStr is a string before assigning it - expiry str formatted as ISOString
            const expiry: string = successRes.userDetails.expiryStr as string;

            // setting the user to global state
            dispatch(setUser(serializedUser))
            dispatch(updateToken({token , expiry}))
            navigate(from, { replace: true });
        }).finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)
        })
    }

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
                    <img src={"/logo.svg"} alt={"Logo Image"} className={"w-28 m-5 drop-shadow-lg"}/>

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

                    <div
                        className={`transition-all duration-100 p-4 border flex flex-row w-[80%] rounded-2xl shadow-md`}>
                        <img src={icon} className={"w-9 p-1 drop-shadow-md"} alt={"icon of pencil"}/>
                        <input
                            className={"w-full h-10 p-2 ml-2 text-clamping-sm font-exo"}
                            type={"password"}
                            id={"password"}
                            autoComplete={"true"}
                            value={input.password}
                            onChange={(e) => setInput(prevState => ({...prevState, password: e.target.value}))}
                            placeholder={"Password"}
                        />
                    </div>
                    <h3 onClick={() => navigate("/signup/researcher")}
                        className={"text-clamping-sm text-black-half hover:text-black duration-200 transition-all truncate cursor-pointer"}>Open
                        Researcher Account</h3>
                    <Button disabled={isLoading}
                            className={"font-exo hover:bg-buttons-blue shadow-md hover:shadow-xl m-10 active:scale-110 w-[60%]"}>
                        Login
                    </Button>
                </form>
            </div>
        </>
    );
}

export default LoginResearcher;