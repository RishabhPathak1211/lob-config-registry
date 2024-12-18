import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Autocomplete } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Type } from "./addNewConfig.types";
import "./addNewConfig.css";
import {
  checkDefaultValueValidity,
  getAllPossibleTypes,
  shouldChangeDefaultValue,
} from "./addNewConfigService";
function AddNewConfig() {
  const possibleTypes: Type[] = getAllPossibleTypes();
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<Type>(possibleTypes[0]);
  const [docUrl, setDocUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [possibleValues, setPossibleValues] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>(
    possibleTypes[0].defaultValue
  );
  const [defaultValue, setDefaultValue] = useState<string>(
    possibleTypes[0].defaultValue
  );
  const [showDropDownValues, setShowDropDownValues] = useState(false);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [isDefaultValueValid, setIsDefaultValueValid] = useState(true);
  const [defaultValueErrorMessage, setDefaultValueErrorMessage] = useState("");
  const [isTestValueValid, setIsTestValueValid] = useState(true);
  const [testValueErrorMessage, setTestValueErrorMessage] = useState("");
  const canSubmit = name && type && docUrl && description && isDefaultValueValid;
  const handleSubmit = (e: React.FormEvent) => {
    setIsSubmitAttempted(true);
    if(!canSubmit) return;
    e.preventDefault();
    console.log({
      name,
      type,
      docUrl,
      description,
      possibleValues,
      inputValue,
      defaultValue,
    });
  };
  const handleCancel = () => {
    setName("");
    setDocUrl("");
    setDescription("");
    setPossibleValues("");
    setInputValue(type.defaultValue)
    setDefaultValue(type.defaultValue);
    setIsSubmitAttempted(false);
    setIsTestValueValid(true);
    setIsDefaultValueValid(true);
    setShowDropDownValues(false);
  };
  const handleTypeChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: Type | null
  ) => {
    if (!value) return;
    setType(value);
    if (shouldChangeDefaultValue(defaultValue)) {
      setDefaultValue(value.defaultValue);
    }
    if (shouldChangeDefaultValue(inputValue)) {
      setInputValue(value.defaultValue);
    }
  };
  useEffect(() => {
    if (defaultValue) {
      const [isValid, errorMessage] = checkDefaultValueValidity(
        defaultValue,
        type,
        possibleValues,
        "default"
      );
      setIsDefaultValueValid(isValid);
      setDefaultValueErrorMessage(errorMessage);
    } else {
      setIsDefaultValueValid(true);
      setDefaultValueErrorMessage("");
    }
  }, [defaultValue, type, possibleValues]);
  useEffect(() => {
    if (defaultValue) {
      const [isValid, errorMessage] = checkDefaultValueValidity(
        inputValue,
        type,
        possibleValues,
        "test"
      );
      setIsTestValueValid(isValid);
      setTestValueErrorMessage(errorMessage);
    } else {
      setIsTestValueValid(true);
      setTestValueErrorMessage("");
    }
  }, [inputValue, type, possibleValues]);
  return (
    <div className="addNewConfig-wrapper">
      <Typography variant="h4" gutterBottom className="">
        Add New Config
      </Typography>
      <div className="addNewConfig-form-wrapper">
        <div className="addNewConfig-form-name-and-type-container">
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            error={isSubmitAttempted && !name}
            helperText={isSubmitAttempted && !name ? "Name is Required" : ""} // Conditional helper text
            placeholder="Give a name for the config"
          />
          <Autocomplete
            fullWidth
            options={possibleTypes}
            value={type}
            onChange={handleTypeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Type"
                variant="outlined"
                required
                placeholder="Select the type of value the config will have"
                error={isSubmitAttempted && !type}
                helperText={
                  isSubmitAttempted && !type ? "Type is Required" : ""
                }
              />
            )}
          />
        </div>
        <div className="addNewConfig-form-url-and-description-container">
          <TextField
            fullWidth
            label="Document URL"
            variant="outlined"
            type="url"
            required
            value={docUrl}
            onChange={(e) => setDocUrl(e.target.value)}
            error={isSubmitAttempted && !docUrl}
            placeholder="Enter the document URL"
            helperText={
              isSubmitAttempted && !docUrl ? "Document URL is Required" : ""
            }
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            required
            value={description}
            placeholder="Enter the description of the config"
            onChange={(e) => setDescription(e.target.value)}
            error={isSubmitAttempted && !description}
            helperText={
              isSubmitAttempted && !description ? "Description is Required" : ""
            }
          />
        </div>
        <div className="addNewConfig-form-possibleValues-container">
          <TextField
            fullWidth
            label="Possible Values"
            variant="outlined"
            multiline
            rows={3}
            value={possibleValues}
            onChange={(e) => setPossibleValues(e.target.value)}
            placeholder="List line seperated RexExp. Like ^[a-zA-Z0-9]+$"
          />
        </div>
        <div className="addNewConfig-form-testValidation-wrapper">
          <Button
            onClick={() => setShowDropDownValues(!showDropDownValues)}
            className="addNewConfig-form-testValidation-button"
          >
            <FontAwesomeIcon
              icon={showDropDownValues ? faChevronDown : faChevronRight}
            />
            <div>Try out the config validations</div>
          </Button>
          {showDropDownValues && (
            <div>
              <TextField
                fullWidth
                label="Test"
                variant="outlined"
                value={inputValue}
                multiline
                rows={10}
                placeholder="Enter the input to test the validation"
                onChange={(e) => setInputValue(e.target.value)}
                error={!isTestValueValid}
                helperText={!isTestValueValid ? testValueErrorMessage : ""}
              />
            </div>
          )}
    </div>

        <div className="addNewConfig-form-defaultValue-container">
          <TextField
            fullWidth
            label="Default Value"
            variant="outlined"
            value={defaultValue}
            multiline
            rows={10}
            required
            placeholder="Enter the default value for the config"
            onChange={(e) => setDefaultValue(e.target.value)}
            error={(isSubmitAttempted && !defaultValue) || !isDefaultValueValid}
            helperText={
              isSubmitAttempted && !defaultValue
                ? "Default Value is Required"
                : !isDefaultValueValid
                ? defaultValueErrorMessage
                : ""
            }
          />
        </div>
        <div className="addNewConfig-form-buttons-container">
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            style={
                {
                    backgroundColor:"#03C5B0"
                }
            }
          >
            Submit
          </Button>
          <Button variant="outlined"  onClick={handleCancel} style={
                {
                    backgroundColor:"#A2A2A2",
                    color:"white",
                    borderColor:"#A2A2A2"
                }
            }>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewConfig;
