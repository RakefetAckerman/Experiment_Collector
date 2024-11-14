import ExperimentCard from "../features/ExperimentDashBoard/ExperimentCard.tsx";
import iconExperiment from "../assets/experiment_icon.svg"
import iconTesting from  "../assets/fire-extinguisher.svg"

const ExperimentsDashboard = () => {
    return <div
        className={`pt-12 w-full h-full flex gap-6 flex-col items-center laptop:items-center justify-start overflow-x-hidden overflow-y-scroll`}>
        <ExperimentCard to={"/experiment/prm"} image={iconExperiment}
                        text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas"}
                        headline={"PRM"}/>
        <ExperimentCard to={"/experiment/test"} image={iconTesting}
                        text={"Ui object Testing"}
                        className={"border border-red-500 "}
                        headline={"TESTING"}/>
    </div>;
};

export default ExperimentsDashboard;
