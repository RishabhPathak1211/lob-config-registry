export interface ConfigurationInitialValues {
  configs : Record<string, Record<string, Record<string, string>>>,
  selectedDomain:string
}

export const CONFIGURATION_REDUCER_DEFAULT_VALUE: ConfigurationInitialValues = {
    configs : {},
    selectedDomain:""
  };
  