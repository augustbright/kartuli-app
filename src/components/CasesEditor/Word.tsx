import { Chip, TextField, Typography } from "@firecms/cloud";
import { TCase, TCasesSpace } from "./types";
import { useCallback, useEffect, useRef, useState } from "react";

export const Word = <Space extends TCasesSpace>({ caseValue, word, onUpdate }: {
    caseValue: TCase<Space>;
    word?: string;
    onUpdate: (word: string, newCase: TCase<Space>) => void;
}) => {
    const [isEditing, setEditing] = useState(false);
    const [wordValue, setWordValue] = useState(word || "");
    const inputRef = useRef<HTMLInputElement>(null);
    const submit = useCallback(() => {
        if (wordValue !== word) {
            onUpdate(wordValue, caseValue);
        }
        setEditing(false);
    }, [onUpdate, wordValue, caseValue]);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);

    useEffect(() => {
        if (isEditing) {
            const handleBlur = () => {
                submit();
            };
            inputRef.current?.addEventListener('blur', handleBlur);

            return () => inputRef.current?.removeEventListener('blur', handleBlur);
        }
    }, [isEditing, submit]);

    if (!word) {
        return <Typography color="secondary">-</Typography>;
    }

    if (isEditing) {
        return (
            <TextField
                inputRef={inputRef}
                value={wordValue}
                onChange={(e) => setWordValue(e.target.value)}
                label="Word"
                placeholder="Enter text"
            />
        );
    }

    return <Chip onClick={() => setEditing(true)} colorScheme="blueLighter">{word}</Chip>;
};