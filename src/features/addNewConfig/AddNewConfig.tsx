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
  checkIfDocURLIsValid,
  checkIfDomainTypeValueIsValid,
  checkIfRegExpsAreValid,
  getAllPossibleTypes,
  makeAddNewConfigPostRequest,
  shouldChangeDefaultValue,
} from "./addNewConfigService";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "primereact/resources/primereact.min.css"; // Core CSS
import "primereact/resources/themes/tailwind-light/theme.css"; // Adjust the theme as needed; for a specific Material theme
import "primeicons/primeicons.css";

function AddNewConfig() {
  const possibleTypes: Type[] = getAllPossibleTypes();
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<Type>(possibleTypes[0]);
  const [docUrl, setDocUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [possibleValues, setPossibleValues] = useState<string>("");
  const [isPossibleValuesValid, setIsPossibleValuesValid] = useState(true);
  const [domainType, setDomainType] = useState<string>("");
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
  const [isDomainTypeVaid, setIsDomainTypeValid] = useState(true);
  const [isDocUrlValid, setIsDocUrlValid] = useState(true);

  const canSubmit =
    name && type && docUrl && description && isDefaultValueValid && isPossibleValuesValid && isDomainTypeVaid && isDocUrlValid;
  const handleSubmit = async () => {
    if (!canSubmit) return;
    try {
      const body = {
        name: name,
        type: type.type,
        defaultValue: defaultValue,
        docUrl: docUrl,
        description: description,
        possibleVals: possibleValues.split("\n").map((val) => val.trim()),
        domainType: domainType
      };
      const response = await makeAddNewConfigPostRequest(body);
      if (response.status === 200) {
        alert("Config added successfully");
      }
    } catch (error) {
      alert("Failed to add config");
      console.error(error);
    }
  };
  const handleCancel = () => {
    setName("");
    setDocUrl("");
    setDescription("");
    setPossibleValues("");
    setInputValue(type.defaultValue);
    setDefaultValue(type.defaultValue);
    setDomainType("");
    setIsSubmitAttempted(false);
    setIsTestValueValid(true);
    setIsDefaultValueValid(true);
    setShowDropDownValues(false);
    setIsPossibleValuesValid(true);
    setIsDomainTypeValid(true);
    setIsDocUrlValid(true);
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
  const handlePossibleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPossibleValues(newValue);
    if (newValue) {
      const isValid = checkIfRegExpsAreValid(newValue);
      setIsPossibleValuesValid(isValid);
    }
    else{
      setIsPossibleValuesValid(true);
    }

  }
  const handleDomainTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDomainType(value);
    if(value){
      const isValid = checkIfDomainTypeValueIsValid(value);
      setIsDomainTypeValid(isValid);
    }
    else{
      setIsDomainTypeValid(true);
    }
  }
  const handleDocUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDocUrl(value);
    if(value){
      const isValid = checkIfDocURLIsValid(value);
      setIsDocUrlValid(isValid);
    }
    else{
      setIsDocUrlValid(true);
    }
  }
  const confirmSubmit = () => {
    confirmDialog({
      message: "Are you sure you want to submit?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: handleSubmit, // Call handleSubmit if confirmed
      reject: () => {}, // Optional: handle rejection if needed
    });
  };
  const confirmCancel = () => {
    confirmDialog({
      message: "Are you sure you want to cancel?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: handleCancel, // Call handleCancel if confirmed
      reject: () => {}, // Optional: handle rejection if needed
    });
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
            onChange={handleDocUrlChange}
            error={(isSubmitAttempted && !docUrl) || !isDocUrlValid}
            placeholder="Enter the document URL"
            helperText={
              (isSubmitAttempted && !docUrl) 
              ? "Document URL is Required" 
              : !isDocUrlValid
              ? "Invalid URL (HINT: include http:// or https://)"
              : ""
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
        <div className="addNewConfig-form-domainType-container">
        <TextField
            fullWidth
            label="Domain Type"
            variant="outlined"
            value={domainType}
            required
            onChange={handleDomainTypeChange}
            error={(isSubmitAttempted && !domainType) || !isDomainTypeVaid}
            helperText={
              (isSubmitAttempted && !domainType) 
              ? "Domain Type is Required" 
              : !isDomainTypeVaid
              ? "Domain Type must only be alphanumeric and underscores"
              : ""
            } // Conditional helper text
            placeholder="Give a Domain Type for the config"
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
            onChange={handlePossibleValueChange}
            placeholder="List line seperated RexExp. Like ^[a-zA-Z0-9]+$"
            error = {!isPossibleValuesValid}
            helperText = {!isPossibleValuesValid ? "Possible values are invalid" : "" }
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
            <div>Test the config validations</div>
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
            type="button" // Ideally, use "button" for confirmation
            onClick={()=>{  
              setIsSubmitAttempted(true);
              if(canSubmit)
                confirmSubmit();
            }}
            style={{ backgroundColor: "#03C5B0" }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            type="button" // Ideally, use "button" for confirmation
            onClick={confirmCancel}
            style={{
              backgroundColor: "#A2A2A2",
              color: "white",
              borderColor: "#A2A2A2",
            }}
          >
            Cancel
          </Button>
          {/* Include the ConfirmDialog in your component */}
          <ConfirmDialog />
        </div>
      </div>
    </div>
  );
}
export default AddNewConfig;