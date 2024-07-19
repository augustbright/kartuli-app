import { TCase, TCasesSpace, TCaseTree } from "./types";

export const CasesTable = <Space extends TCasesSpace>({ tree, caption, levelCase, renderWord }: {
    tree: TCaseTree<Space>;
    caption: React.ReactNode;
    levelCase: TCase<Space>;
    renderWord: (levelCase: TCase<Space>) => React.ReactNode;
}) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption>{caption}</caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3"></th>

                        {((Object.values(tree.branches)[0] as TCaseTree<Space>).branches as string[]).map(key => (
                            <th key={key} scope="col" className="px-6 py-3">{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(tree.branches).map(([trTitle, subtree]) => (
                        <tr key={trTitle} className="">
                            <th scope="row" className="text-right w-0 px-6 py-4 whitespace-nowrap text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">{trTitle}</th>
                            {Object.values((subtree as TCaseTree<Space>).branches).map(key => (
                                <td key={key} className="border-b dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-800">{renderWord({
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
};