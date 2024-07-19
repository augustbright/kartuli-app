import { TCasesSpace } from "./types";

export const VERB_CASES = {
    tense: ["present", "future", "past incomplete", "past complete", "optative"],
    case1: ["foo", "bar", "baz"],
    cheese: ["one", "two", "thre"],
    person: ["first", "second", "third"],
    number: ["singular", "plural"],
} as const satisfies TCasesSpace;
