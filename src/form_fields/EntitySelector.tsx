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

export default function EntitySelector({
    property,
    value = { face: "first", plural: false, used: false },
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
    used: boolean;
    face: "first" | "second" | "third";
    plural: boolean;
}>) {
    return (
        <>
            <Paper className="p-2">
                <div className="flex gap-2 items-center">
                    <FieldCaption>{property.name}</FieldCaption>
                    <Label className="flex items-center gap-2" htmlFor="used">
                        <Checkbox
                            size="tiny"
                            id="used"
                            checked={value.used}
                            onCheckedChange={(newChecked) =>
                                setValue({
                                    ...value,
                                    used: newChecked,
                                })
                            }
                        />
                        Used
                    </Label>
                </div>
                {value.used ? (
                    <div className="flex row gap-2 mt-2">
                        <Label
                            className="flex items-center gap-2"
                            htmlFor="plural"
                        >
                            <Checkbox
                                id="plural"
                                checked={value.plural}
                                onCheckedChange={(newChecked) =>
                                    setValue({
                                        ...value,
                                        plural: newChecked,
                                    })
                                }
                            />
                            Plural
                        </Label>

                        <Select
                            size="small"
                            value={value.face}
                            onValueChange={(face) =>
                                setValue({
                                    ...value,
                                    face: face as "first" | "second" | "third",
                                })
                            }
                            placeholder={<i>Select face</i>}
                            renderValue={(value) => {
                                if (value === "first") {
                                    return "First";
                                } else if (value === "second") {
                                    return "Second";
                                } else if (value === "third") {
                                    return "Third";
                                }
                                throw new Error("Invalid value");
                            }}
                        >
                            <SelectItem value="first">First</SelectItem>
                            <SelectItem value="second">Second</SelectItem>
                            <SelectItem value="third">Third</SelectItem>
                        </Select>
                    </div>
                ) : null}
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
