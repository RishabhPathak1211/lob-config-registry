import { Type } from "./addNewConfig.types";

export const getAllPossibleTypes = (): Type[] => {
  return [
    { label: "String", type: "string", defaultValue: `` },
    { label: "Number", type: "number", defaultValue: "" },
    { label: "Boolean", type: "boolean", defaultValue: `false` },
    { label: "List", type: "list", defaultValue: `[]` },
    { label: "Object", type: "object", defaultValue: `{}` },
  ];
};
export const shouldChangeDefaultValue = (defaultVal: string): boolean => {
  const allDefaultValues = getAllPossibleTypes().map(
    (type) => type.defaultValue
  );
  return allDefaultValues.includes(defaultVal) || defaultVal === "";
};
const parseValue = (input: string) => {
  // Attempt to parse input as JSON (for objects and arrays)
  try {
    const parsed = JSON.parse(input);

    // Check if the parsed value is an object or an array
    if (typeof parsed === "object" && parsed !== null) {
      return parsed; // It is either an object or array
    }
    return parsed; // It can be boolean or number
  } catch {
    // If parsing fails, return the input as a string
    return input; // It's a string since it cannot be parsed
  }
};

// Function to determine the type
const getType = (value: string): string => {
  const parsedValue = parseValue(value);

  if (typeof parsedValue === "string") {
    return "string";
  }
  if (typeof parsedValue === "number") {
    return "number";
  }
  if (typeof parsedValue === "boolean") {
    return "boolean";
  }
  if (Array.isArray(parsedValue)) {
    return "list"; // Treat arrays as lists
  }
  if (typeof parsedValue === "object") {
    return "object"; // Handle objects
  }
  return "unknown"; // Fallback for unexpected cases
};
export const checkDefaultValueValidity = (
  defaultValue: string,
  type: Type,
  possibleValues: string,
  component : string
): [boolean, string] => {
  // Check if the type matches
  console.log(getType(defaultValue), type.type.toLowerCase());
  const isTypeValid = getType(defaultValue) === type.type.toLowerCase();

  // If possibleValues is provided, check if defaultValue matches any of the regex patterns
  let isValueValid = true;
if (possibleValues) {
  // Create a regex pattern from the comma-separated possible values  
  // Check if defaultValue matches any of the regex patterns
  isValueValid = possibleValues.split("\n").every((value) => {
    const curRegex = new RegExp(value.trim());
    const answer = curRegex.test(String(defaultValue).replace(/\n/g, ''));
    return answer;
});
}

  // Return true only if both checks pass
  if (isTypeValid && isValueValid) {
    return [true, ""];
  } else if (!isTypeValid) {
    return [false, `${component} value does not match the type`];
  } else if (!isValueValid) {
    return [false,  `${component} value does not match the possible values`];
  }
  return [false,  `${component} value is invalid`];
};
