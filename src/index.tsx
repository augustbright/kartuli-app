import { buildCollection, FireCMSAppConfig } from "@firecms/cloud";
import { SampleEntityView } from "./entity_views/SampleEntityView";
import EntitySelector from "./form_fields/EntitySelector";
import VerbCases from "./form_fields/VerbCases";

const appConfig: FireCMSAppConfig = {
    version: "1",
    collections: [
        buildCollection({
            id: "verbs",
            name: "Verbs",
            path: "verbs",
            properties: {
                name: {
                    dataType: "string",
                    name: "Verb",
                    validation: {
                        required: true,
                        unique: true,
                    },
                },

                cases: {
                    dataType: "map",
                    name: "Cases",
                    Field: VerbCases
                },

                // markdown
                text: {
                    dataType: "string",
                    name: "Details",
                    markdown: true,
                },
            },
        }),
        buildCollection({
            id: "verb_forms",
            name: "Verb form",
            path: "verb_forms",
            properties: {
                // string property with validation
                name: {
                    dataType: "string",
                    name: "Form",
                    validation: {
                        required: true,
                    },
                },

                subject: {
                    name: "Subject",
                    description: "The subject that performs the action",
                    dataType: "map",
                    Field: EntitySelector,
                },
                object_direct: {
                    name: "Direct object",
                    description:
                        "The object upon which the action is performed",
                    dataType: "map",
                    Field: EntitySelector,
                },
                object_indirect: {
                    name: "Indirect object",
                    description:
                        "The object with which the action is performed",
                    dataType: "map",
                    Field: EntitySelector,
                },

                // markdown
                text: {
                    dataType: "string",
                    name: "Details",
                    markdown: true,
                },
            },
        }),
    ],
    propertyConfigs: [
        {
            name: "String with color",
            key: "color",
            property: {
                dataType: "string",
                name: "Main color",
                Preview: ({ value }) => {
                    return (
                        <div
                            style={{
                                width: 20,
                                height: 20,
                                backgroundColor: value,
                                borderRadius: "4px",
                            }}
                        />
                    );
                },
            },
        },
        {
            name: "Actor",
            key: "actor",
            property: {
                dataType: "map",
                properties: {
                    used: {
                        dataType: "boolean",
                        name: "Used",
                    },
                    face: {
                        dataType: "string",
                        name: "Face",
                        enumValues: {
                            first: "First",
                            second: "Second",
                            third: "Third",
                        },
                    },
                    plurality: {
                        dataType: "boolean",
                        name: "Plural",
                    },
                },
            },
        },
    ],
    entityViews: [
        {
            key: "sample_entity_view",
            name: "Sample entity view",
            Builder: SampleEntityView,
        },
    ],
};

export default appConfig;
