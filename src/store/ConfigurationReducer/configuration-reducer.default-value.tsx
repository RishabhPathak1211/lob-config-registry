export interface DefaultConfigObjectType {
  
    value: any,
    possibleVals: any[],
    creationTime: any,
    description: string,
    name: string,
    docUrl: string,
    type: any,
    domainType: string

}

export interface ConfigurationInitialValues {
  configs : Record<string, Record<string, Record<string, string>>>,
  selectedDomain:string,
  defaultConfigValues:DefaultConfigObjectType[]
}

export const CONFIGURATION_REDUCER_DEFAULT_VALUE: ConfigurationInitialValues = {
    configs : {},
    selectedDomain:"",
    defaultConfigValues:[]
  };
  