import { useCallback } from "react";
import { CasesRecursiveViewer } from "./CasesRecursiveViewer";
import { buildTree, queryWords } from "./func";
import { TCase, TCasesSpace, TCasesValue, TCategoryEntry } from "./types";

export const CasesViewer = <Space extends TCasesSpace>({ value, categories }: {
    value: TCasesValue<Space>;
    categories: TCategoryEntry[];
}) => {
    const tree = buildTree<Space>(categories);

    const renderWord = useCallback((caseValue: TCase<Space>) => {
        return <div>{queryWords(value, caseValue)?.word}</div>;
    }, [value]);

    return <>
        <CasesRecursiveViewer tree={tree} levelCase={{}} renderWord={renderWord} />

        <table>
            <thead>
                <th></th>
                {Array.from(Object.values(categories)[0]).map(categoryValue => (
                    <th>{categoryValue}</th>
                ))}
            </thead>
            {Array.from(Object.values(categories)[1]).map(category1Value => (
                <tr>
                    <td className="font-bold">{category1Value}</td>
                    {Array.from(Object.values(categories)[0]).map(category0Value => (
                        <td>{Object.entries(value).filter(entry => entry[1]?.some(caseValue => {
                            return caseValue[Object.keys(categories)[0]] === category0Value && caseValue[Object.keys(categories)[1]] === category1Value;
                        })).map(entry => entry[0]).join()}</td>
                    ))}
                </tr>
            ))}
        </table>

    </>;
};