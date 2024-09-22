import ExperimentCard from "../components/experiment/ExperimentCard.tsx";
import icon from "../assets/experiment_icon.svg"

const ExperimentsPage = () => {
    return <div
        className={`pt-12 w-full h-full flex gap-6 flex-col items-center laptop:items-center justify-start overflow-x-hidden overflow-y-scroll`}>
        <ExperimentCard to={"/experiment/prm"} image={icon}
                        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas"}
                        headline={"PRM"}/>

        <ExperimentCard to={"/experiment/prm"} image={icon}
                        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas"}
                        headline={"PRM"}/>
        <ExperimentCard to={"/experiment/prm"} image={icon}
                        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas"}
                        headline={"PRM"}/>
        <ExperimentCard to={"/experiment/prm"} image={icon}
                        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas"}
                        headline={"PRM"}/>

    </div>;
};

export default ExperimentsPage;
