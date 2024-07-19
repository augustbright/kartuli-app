import { CasesTable } from "./CasesTable";
import { TCase, TCasesSpace, TCaseTree } from "./types";

export const CasesRecursiveViewer = <Space extends TCasesSpace>({ parent, tree, levelCase, renderWord, branch }: {
    tree: TCaseTree<Space> | null;
    levelCase: TCase<Space>;
    renderWord: (levelCase: TCase<Space>) => React.ReactNode;
    branch?: string;
    parent?: TCaseTree<Space>;
}) => {
    if (!tree) {
        return <div>Empty</div>;
    }
    if (tree.depth === 0) {
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {(Object.values(tree.branches) as string[]).map(key => (
                                <th key={key} scope="col" className="px-6 py-3">{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            {Object.values(tree.branches as string[]).map(key => (
                                <td key={key} className="border-b dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-800">{renderWord({
                                    ...levelCase,
                                    [tree.id]: key,
                                })}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    if (tree.depth === 1) {
        return <CasesTable
            tree={tree}
            caption={<>{branch} {parent?.id as string}</>}
            levelCase={levelCase}
            renderWord={renderWord}
        />;
    }

    return <>
        {
            Object.entries(tree.branches).map(([categoryValue, subtree]) => (
                <div key={categoryValue} className="p-2 border-gray-400 border border-solid">
                    {tree.depth > 2 && (<div>{categoryValue}</div>)}
                    <CasesRecursiveViewer tree={subtree as TCaseTree<Space>} levelCase={{
                        ...levelCase,
                        [tree.id]: categoryValue
                    }} renderWord={renderWord} branch={categoryValue} parent={tree} />
                </div>
            ))
        }
    </>;
};