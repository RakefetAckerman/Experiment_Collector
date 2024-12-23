import {
    EXAMPLE_TITLE_PARTIALLY_ANSWERED,
    EXPERIMENTS_CREATED,
    LIST_TEMPLATE_TEXT
} from "../utils/constants.ts";
import CardHomeScreen from "../features/Homepage/CardHomeScreen.tsx";
import CardExperimentCreated from "../features/HomeScreenCards/CardExperimentCreated.tsx";


/**
 * Home/Dashboard page - is set to show some information about
 * the user practice in other activities
 * Features to add to page:
 * TODO add Error handling on fetch
 * @constructor
 */
function HomePage() {

    return (
        <div className={`w-full h-full flex  laptop:items-center justify-center overflow-x-hidden overflow-y-scroll`}>
            <div className={"max-laptop:flex max-laptop:mt-10 max-laptop:flex-col laptop:grid laptop:grid-rows-2 items-center grid-flow-col gap-10"}>
                <CardExperimentCreated className={"max-h-[45dvh]"} title={EXPERIMENTS_CREATED}/>
                <CardHomeScreen className={"max-h-[45dvh]"} title={EXAMPLE_TITLE_PARTIALLY_ANSWERED}
                                experimentsNamesAndDates={LIST_TEMPLATE_TEXT}/>
                <CardHomeScreen className={"row-span-2 h-full"} title={"INFORMATION"}
                                experimentsNamesAndDates={[]}/>


            </div>
        </div>
    );
}

export default HomePage;