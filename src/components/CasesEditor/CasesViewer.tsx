import { CasesRecursiveViewer } from "./CasesRecursiveViewer";
import { buildTree } from "./func";
import { TCase, TCasesSpace, TCategoryEntry } from "./types";

export const CasesViewer = <Space extends TCasesSpace>({ categories, renderWord }: {
    categories: TCategoryEntry[];
    renderWord: (caseValue: TCase<Space>) => React.ReactNode;
}) => {
    const tree = buildTree<Space>(categories);

    return <>
        <CasesRecursiveViewer tree={tree} levelCase={{}} renderWord={renderWord} />
    </>;
};