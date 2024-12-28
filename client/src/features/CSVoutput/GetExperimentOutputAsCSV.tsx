import React from 'react';
import {CSVLink} from "react-csv";
import {useSelector} from "react-redux";
import {RootState} from "../../states/store.ts";
import useUsersOutput from "../ExperimentUsersOuput/useUsersOutput.ts";
import LoadingSpinner from "../Loding/LoadingSpinner.tsx";

type GetExperimentOutputAsCsvProps = {
    className?: string;
    experimentID: string;
}

function GetExperimentOutputAsCsv({experimentID}: GetExperimentOutputAsCsvProps) {
    const user = useSelector((state: RootState) => (state.user.user))
    const {error, usersOutput, loading} = useUsersOutput(experimentID, user!);

    if (loading) {
        return <LoadingSpinner/>;
    }
    if (error) {
        return <div className={"w-full h-full flex items-center justify-center flex-col gap-5"}>
            <h2 className={"text-red-500"}>Error occurred</h2>
            <div className={"bg-button-light-blue p-5 text-center font-exo rounded-3xl"}>
                <h2 className={"font-exo text-gray-400"}>please try again by closing the dialog and opening again</h2>
            </div>
        </div>;
    }

    return (
        <div className={"w-full h-full flex items-center justify-center flex-col gap-5"}>
            <h2>Would you like to download experiment data?</h2>
            <div className={"bg-button-light-blue p-5 text-center font-exo rounded-3xl"}>
                <CSVLink filename={`output-${experimentID}-${Date.now().toString()}`} data={usersOutput!.experimentData!}>Download
                    Experiment</CSVLink>
            </div>
        </div>
    );
}


export default GetExperimentOutputAsCsv;