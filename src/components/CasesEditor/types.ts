import { VERB_CASES } from "./constants";

export type TVerbCase = TCase<typeof VERB_CASES>;

export type TCasesValue<Space extends TCasesSpace> = {
    [verb: string]: TCase<Space>[] | undefined;
};

export type TCasesSpace = {
    [key: string]: readonly string[];
};

export type TCase<Space extends TCasesSpace> = Partial<{
    [key in keyof Space]: Space[key][number];
}>;

export type TCaseTree<Space extends TCasesSpace> = {
    id: keyof Space,
    depth: number,
    branches: {
        [key in Space[keyof Space][number]]: TCaseTree<Space>
    } | string[]
};

export type TCategoryEntry = [string, string[]];