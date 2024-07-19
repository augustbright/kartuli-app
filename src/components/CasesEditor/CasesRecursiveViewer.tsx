import { TCase, TCasesSpace, TCaseTree } from "./types";

export const CasesRecursiveViewer = <Space extends TCasesSpace>({ tree, levelCase, renderWord }: {
    tree: TCaseTree<Space>;
    levelCase: TCase<Space>;
    renderWord: (levelCase: TCase<Space>) => React.ReactNode;
}) => {
    if (tree.depth === 0) {
        return <div>***</div>;
    }

    if (tree.depth === 1) {
        return (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <th scope="col" className="px-6 py-3"></th>

                        {((Object.values(tree.branches)[0] as TCaseTree<Space>).branches as string[]).map(key => (
                            <th scope="col" className="px-6 py-3">{key}</th>
                        ))}
                    </thead>
                    <tbody>
                        {Object.entries(tree.branches).map(([trTitle, subtree]) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trTitle}</th>
                                {Object.values((subtree as TCaseTree<Space>).branches).map(key => (
                                    <td className="px-6 py-4">{renderWord({
                                        ...levelCase,
                                        [tree.id]: trTitle,
                                        [subtree.id]: key,
                                    })}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return <>
        {
            Object.entries(tree.branches).map(([categoryValue, subtree]) => (
                <div className="p-2 border-gray-400 border border-solid">
                    <div>{categoryValue}</div>
                    <CasesRecursiveViewer tree={subtree as TCaseTree<Space>} levelCase={{
                        ...levelCase,
                        [tree.id]: categoryValue
                    }} renderWord={renderWord} />
                </div>
            ))
        }
    </>;
};