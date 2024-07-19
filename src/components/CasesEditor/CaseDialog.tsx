import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from "@firecms/cloud";
import { TCase, TCasesSpace } from "./types";
import { CasePicker } from "./CasePicker";
import { useState } from "react";

export const CaseDialog = <Space extends TCasesSpace>({ open, onOpenChange, header, space, initialValue, initialWord, onSubmit }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (newValue: TCase<Space>, word: string) => void;
    header: string;
    space: Space;
    initialValue: TCase<Space>;
    initialWord: string;
}) => {
    const [caseValue, setCaseValue] = useState(initialValue);
    const [word, setWord] = useState(initialWord);
    const handleOpenChange = (newValue: boolean) => {
        if (!newValue) {
            setCaseValue(initialValue);
        }
        onOpenChange(newValue);
    };
    return (
        <Dialog
            open={open}
            onOpenChange={handleOpenChange}>
            <DialogContent className="p-8 flex flex-col space-y-2">
                <Typography variant={"h5"} gutterBottom>
                    {header}
                </Typography>
                <div>
                    {
                        Object.entries(space).map((entry) => {
                            const [categoryId, options] = entry as unknown as [keyof Space, Space[keyof Space]];
                            return (
                                <div key={categoryId as string} className="flex flex-col">
                                    <Typography gutterBottom>
                                        {categoryId as string}
                                    </Typography>
                                    <CasePicker value={caseValue[categoryId]} onValueChange={(newValue) => {
                                        setCaseValue({
                                            ...caseValue,
                                            [categoryId]: newValue
                                        });
                                    }} options={options} placeholder="Select" />
                                </div>
                            );
                        })
                    }
                </div>
                <TextField
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    label="Word form"
                    placeholder="Enter text"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleOpenChange(false)} variant={"text"}>
                    Cancel
                </Button>
                <Button onClick={() => onSubmit(caseValue, word)}
                    variant={"filled"}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};