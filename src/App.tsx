import React, { useState } from "react";
import { FireCMSCloudApp } from "@firecms/cloud";
import appConfig from "./index";
import { CasesEditor } from "./components/CasesEditor";
import { TCasesValue } from "./components/CasesEditor/types";
import { VERB_CASES } from "./components/CasesEditor/constants";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    const [cases, setCases] = useState<TCasesValue<typeof VERB_CASES>>({
        "one": [],
        "qwer1": [
            {
                "case1": "bar",
                "cheese": "two",
                "number": "singular",
                "tense": "optative",
                "person": "second",
            }
        ],
        "two": [
            {
                "person": "second"
            }
        ],
        "three": [
            {
                "person": "first"
            },
            {
                "person": "second",
                "number": "singular"
            }
        ],
        "four": [
            {
                "person": "third",
                "number": "singular",
                "tense": "future"
            }
        ],
        "qwer": [
            {
                "person": "second",
                "number": "singular",
                "tense": "optative"
            },
            {
                "person": "second",
                "number": "singular",
                "tense": "optative",
                "case1": "foo",
                "cheese": "two"
            }
        ],
    });
    return <DndProvider backend={HTML5Backend}>
        <div className="flex w-dvw gap-4 p-6">
            <pre>{JSON.stringify(cases, null, 2)}</pre>
            <div className="grow">
                <CasesEditor space={VERB_CASES} value={cases} onValueChange={setCases} />
            </div>
        </div>
    </DndProvider>;
    return <FireCMSCloudApp
        projectId={"kartuli-app-0uun2"}
        appConfig={appConfig}
    />;
}

export default App;
