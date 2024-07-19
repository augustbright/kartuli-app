import { Button } from "@firecms/cloud";
import { useState } from "react";
import { TCase, TCasesSpace } from "./types";
import { CaseDialog } from "./CaseDialog";

export const AddCase = <Space extends TCasesSpace>({ onSubmitCase, space }: {
    onSubmitCase: (word: string, newCase: TCase<Space>) => void;
    space: Space;
}) => {
    const [open, setOpen] = useState(false);
    const handleAdd = (caseValue: TCase<Space>, word: string) => {
        setOpen(false);
        onSubmitCase(word, caseValue);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="filled">Add Case</Button>
            <CaseDialog header="Add case" initialValue={{}} initialWord="" onOpenChange={setOpen} open={open} onSubmit={handleAdd} space={space} />
        </>
    );
};