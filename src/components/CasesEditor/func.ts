import {
    TCase,
    TCasesSpace,
    TCasesValue,
    TCaseTree,
    TCategoryEntry,
} from "./types";

export const buildCategories = <Space extends TCasesSpace>(
    value: TCasesValue<Space>,
    space: Space
): TCategoryEntry[] =>
    (
        Object.entries(
            Object.entries(value).reduce((prev, entry) => {
                const result: Record<string, Array<string>> = {
                    ...prev,
                };
                entry[1]?.forEach((caseValue) => {
                    Object.entries(caseValue).forEach(([categoryId]) => {
                        result[categoryId] = space[categoryId].slice();
                    });
                });
                return result;
            }, {})
        ) as TCategoryEntry[]
    ).map((entry) => {
        entry[1].sort(
            (a, b) => space[entry[0]].indexOf(a) - space[entry[0]].indexOf(b)
        );
        return entry;
    });

export const updateCategories = <Space extends TCasesSpace>(
    prevCategories: TCategoryEntry[],
    newValue: TCasesValue<Space>,
    space: Space
): TCategoryEntry[] => {
    const defaultCategories = buildCategories(newValue, space);

    // update or remove current categories
    const newCategories = prevCategories
        .map((prevCategoryEntry) => {
            const newEntry = defaultCategories.find(
                (entry) => entry[0] === prevCategoryEntry[0]
            );
            if (!newEntry) {
                return [prevCategoryEntry[0], []] as TCategoryEntry;
            }

            return newEntry;
        })
        .filter((entry) => entry[1].length > 0);

    // Add new categories
    defaultCategories.forEach((spaceEntry) => {
        if (
            newCategories.find(
                (newCategory) => newCategory[0] === spaceEntry[0]
            )
        ) {
            // skip
        } else {
            newCategories.unshift([spaceEntry[0], spaceEntry[1].slice()]);
        }
    });

    return newCategories;
};

export const buildTree = <Space extends TCasesSpace>(
    entries: TCategoryEntry[]
): TCaseTree<Space> | null => {
    if (entries.length === 0) {
        return null;
    }

    if (entries.length === 1)
        return {
            id: entries[0][0],
            branches: entries[0][1],
            depth: 0,
        };

    const childTree = buildTree(entries.slice(1));
    const reducer = (
        prev: TCaseTree<Space>["branches"],
        categoryValue: string
    ) => ({
        ...prev,
        [categoryValue]: childTree,
    });
    return {
        id: entries[0][0],
        branches: entries[0][1].reduce<TCaseTree<Space>["branches"]>(
            reducer,
            {} as any
        ),
        depth: (childTree?.depth || 0) + 1,
    } as TCaseTree<Space>;
};

export const queryWords = <Space extends TCasesSpace>(
    casesValue: TCasesValue<Space>,
    query: TCase<Space>
) => {
    type TBestMatch = {
        count: number;
        value: TCase<Space>;
        word: string;
    } | null;

    const bestMatch = Object.entries(casesValue).reduce(
        (bestMatch, casesEntry) => {
            const match = casesEntry[1]
                ?.filter((caseValue) =>
                    Object.entries(caseValue).every(
                        (caseValueEntry) =>
                            query[caseValueEntry[0]] === caseValueEntry[1]
                    )
                )
                .reduce((bestMatch, caseValue) => {
                    // Count matched aspects
                    const matchedAspectsCount = Object.entries(
                        caseValue
                    ).reduce((matchedCount, caseValueEntry) => {
                        if (query[caseValueEntry[0]] === caseValueEntry[1]) {
                            return matchedCount + 1;
                        }
                        return matchedCount;
                    }, 0);

                    if (
                        (bestMatch === null && matchedAspectsCount > 0) ||
                        (bestMatch && bestMatch.count < matchedAspectsCount)
                    ) {
                        return {
                            count: matchedAspectsCount,
                            value: caseValue,
                            word: casesEntry[0],
                        } satisfies TBestMatch;
                    }

                    return bestMatch;
                }, null as TBestMatch);

            if (!bestMatch && match) {
                return match;
            }

            if (bestMatch && match && match.count > bestMatch.count) {
                return match;
            }

            return bestMatch;
        },
        null as TBestMatch
    );

    return bestMatch;
};
