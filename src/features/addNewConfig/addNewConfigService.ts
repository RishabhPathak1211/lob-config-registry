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
  component: string
): [boolean, string] => {
  // Check if the type matches
  const isTypeValid = getType(defaultValue) === type.type.toLowerCase();

  // If possibleValues is provided, check if defaultValue matches any of the regex patterns
  let isValueValid = true;

  if (possibleValues) {
    if(!checkIfRegExpsAreValid(possibleValues)) {
      return [false, `Possible values are invalid`]
    }
    // Create a regex pattern from the comma-separated possible values
    // Check if defaultValue matches any of the regex patterns
    isValueValid = possibleValues.split("\n").every((value) => {
      const curRegex = new RegExp(value.trim());
      const answer = curRegex.test(String(defaultValue).replace(/\n/g, ""));
      return answer;
    });
  }

  // Return true only if both checks pass
  if (isTypeValid && isValueValid) {
    return [true, ""];
  } else if (!isTypeValid) {
    return [false, `${component} value does not match the type`];
  } else if (!isValueValid) {
    return [false, `${component} value does not match the possible values`];
  }
  return [false, `${component} value is invalid`];
};
export const makeAddNewConfigPostRequest = async (body: {
  name: string;
  type: string;
  defaultValue: string;
  docUrl: string;
  description: string;
  possibleVals: string[];
}) => {
  return {
    status : 200
  }
  try {
    const response = await fetch("/api/addNewConfig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to add config ${error}`);
  }
};
export const checkIfRegExpsAreValid = (possibleValues : string) : boolean => {
  const regexps = possibleValues.split("\n");
  try {
    regexps.forEach((regexp) => {
      new RegExp(regexp.trim());
    });
    return true;
  } catch {
    return false;
  }
}
export const checkIfDomainTypeValueIsValid = (value: string): boolean => {
  // Ensure it is a string and contains only alphanumeric characters and underscores
  return typeof value === "string" && /^[a-zA-Z0-9_]*$/.test(value);
};
export const checkIfDocURLIsValid = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  }
  catch {
    return false;
  }
}