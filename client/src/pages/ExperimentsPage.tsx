import {NavLink} from "react-router-dom";

const ExperimentsPage = () => {
    return <div
        className={`w-full h-full flex  laptop:items-center justify-center overflow-x-hidden overflow-y-scroll`}>
        <NavLink to={"/experiment/prm"} className={"w-96 h-52 bg-white drop-shadow-lg items-center justify-center flex rounded-3xl"}> jump to prm</NavLink>
    </div>;
};

export default ExperimentsPage;
