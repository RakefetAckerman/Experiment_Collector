import {EXAMPLE_TITLE_ANSWERED, EXAMPLE_TITLE_PARTIALLY_ANSWERED, LIST_TEMPLATE_TEXT} from "../utils/constants.ts";
import CardHomeScreen from "../components/homepage/CardHomeScreen.tsx";

function HomePage() {

    return (
        <div className={`w-full h-full flex items-center justify-center`}>
            <div className={"grid grid-rows-2 items-center grid-flow-col gap-10"}>

                <CardHomeScreen className={"max-h-[45dvh]"} title={EXAMPLE_TITLE_ANSWERED}
                                experimentsNamesAndDates={LIST_TEMPLATE_TEXT}/>
                <CardHomeScreen className={"max-h-[45dvh]"} title={EXAMPLE_TITLE_PARTIALLY_ANSWERED}
                                experimentsNamesAndDates={LIST_TEMPLATE_TEXT}/>
                <CardHomeScreen className={"row-span-2 h-full"} title={EXAMPLE_TITLE_ANSWERED}
                                experimentsNamesAndDates={LIST_TEMPLATE_TEXT}/>


            </div>
        </div>
    );
}

export default HomePage;