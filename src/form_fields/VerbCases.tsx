import React from "react";
import {
    Checkbox,
    FieldCaption,
    FieldHelperText,
    FieldProps,
    Label,
    Paper,
    Select,
    SelectItem,
} from "@firecms/cloud";

export default function VerbCases({
    property,
    value,
    setValue,
    setFieldValue,
    customProps,
    touched,
    includeDescription,
    showError,
    error,
    isSubmitting,
    context, // the rest of the entity values here
    ...props
}: FieldProps<{
    [key: string]: Array<{
        face: "first" | "second" | "third";
        plural: boolean;
    }>
}>) {
    return (
        <>
            <Paper className="p-2">
                <div className="flex gap-2 items-center">
                    <FieldCaption>{property.name}</FieldCaption>
                </div>
            </Paper>
            <FieldHelperText
                includeDescription={includeDescription}
                showError={showError}
                error={error}
                property={property}
            />
        </>
    );
}
