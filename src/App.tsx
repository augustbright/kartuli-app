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
        // Говорю: [{
        //     person: 'first'
        // }]
    });
    return <DndProvider backend={HTML5Backend}>
        <CasesEditor space={VERB_CASES} value={cases} onValueChange={setCases} />
    </DndProvider>;
    return <FireCMSCloudApp
        projectId={"kartuli-app-0uun2"}
        appConfig={appConfig}
    />;
}

export default App;
