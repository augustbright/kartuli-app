import { TCase, TCasesSpace, TCasesValue } from "./types";
import { AddCase } from "./AddCase";
import { dequal } from 'dequal';
import { CasesViewer } from "./CasesViewer";
import { buildCategories, queryWords, updateCategories } from "./func";
import { CategoriesManager } from "./CategoriesManager";
import { useCallback, useState } from "react";
import { Word } from "./Word";

export const CasesEditor = <Space extends TCasesSpace>({ value, onValueChange, space }: {
    value: TCasesValue<Space>;
    onValueChange: (newValue: TCasesValue<Space>) => void;
    space: Space;
}) => {
    const [categories, setCategories] = useState(() => buildCategories(value, space));

    const saveCase = (word: string, newCase: TCase<Space>) => {
        const newValue: typeof value = Object.entries(value).reduce((prev, entry) => {
            return {
                ...prev,
                [entry[0]]: entry[1]?.filter(caseValue => !dequal(caseValue, newCase))
            };
        }, {});
        const currentCases = newValue[word] || [];
        currentCases.push(newCase);

        const updatedValue = {
            ...newValue,
            [word]: currentCases
        };
        onValueChange(updatedValue);
        setCategories(updateCategories(categories, updatedValue, space));
    };

    const renderWord = useCallback((caseValue: TCase<Space>) => {
        const match = queryWords(value, caseValue);
        return <Word caseValue={caseValue} word={match?.word} onUpdate={saveCase} />;
    }, [value]);

    return (
        <div className="flex w-dvw gap-4 p-6">
            <div>
                <AddCase space={space} onSubmitCase={saveCase} />
                <pre>{JSON.stringify(value, null, 2)}</pre>
            </div>
            <div className="grow">
                <div className="flex flex-col gap-2">
                    <CategoriesManager casesValue={value} onValueChange={setCategories} value={categories} />
                    <CasesViewer categories={categories} renderWord={renderWord} />
                </div>
            </div>
        </div>

    );
};
