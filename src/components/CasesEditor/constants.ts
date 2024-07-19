import { TCasesSpace } from "./types";

export const VERB_CASES = {
    number: ["singular", "plural"],
    tense: [
        "present",
        "future",
        "past incomplete",
        "past complete",
        "optative",
    ],
    person: ["first", "second", "third"],
} as const satisfies TCasesSpace;
