import { TCasesSpace, TCasesValue } from "./types";
import { AddCase } from "./AddCase";
import { dequal } from 'dequal';
import { CasesViewer } from "./CasesViewer";
import { buildCategories, updateCategories } from "./func";
import { CategoriesManager } from "./CategoriesManager";
import { useState } from "react";

export const CasesEditor = <Space extends TCasesSpace>({ value, onValueChange, space }: {
    value: TCasesValue<Space>;
    onValueChange: (newValue: TCasesValue<Space>) => void;
    space: Space;
}) => {
    const [categories, setCategories] = useState(() => buildCategories(value));

    return (
        <div className="flex flex-col gap-2">
            <CategoriesManager casesValue={value} onValueChange={setCategories} value={categories} />
            <CasesViewer value={value} categories={categories} />
            <AddCase space={space} onSubmitCase={(word, newCase) => {
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
                setCategories(updateCategories(categories, updatedValue));
            }} />
        </div>
    );
};
