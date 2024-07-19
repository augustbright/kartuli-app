import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from "@firecms/cloud";
import { useState } from "react";
import { TCase, TCasesSpace } from "./types";
import { CasePicker } from "./CasePicker";

export const AddCase = <Space extends TCasesSpace>({ onSubmitCase, space }: {
    onSubmitCase: (word: string, newCase: TCase<Space>) => void;
    space: Space;
}) => {
    const [open, setOpen] = useState(false);
    const [caseValue, setCaseValue] = useState<TCase<Space>>({});
    const [word, setWord] = useState("");
    const handleAdd = () => {
        setOpen(false);
        onSubmitCase(word, caseValue);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="filled">Add Case</Button>

            <Dialog
                open={open}
                onOpenChange={setOpen}>
                <DialogContent className="p-8 flex flex-col space-y-2">
                    <Typography variant={"h5"} gutterBottom>
                        Add case
                    </Typography>
                    <div>
                        {
                            Object.entries(space).map((entry) => {
                                const [categoryId, options] = entry as unknown as [keyof Space, Space[keyof Space]];
                                return (
                                    <div className="flex flex-col">
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
                    <Button onClick={() => setOpen(false)} variant={"text"}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd}
                        variant={"filled"}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};