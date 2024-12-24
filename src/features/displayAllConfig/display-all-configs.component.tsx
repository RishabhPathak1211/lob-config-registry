import { useSelector } from 'react-redux';
import { selectConfigs, selectCurrentDomain, selectDefaultConfigValues } from '../../store/ConfigurationReducer/configuration.selector'
import BasicTable from './components/display-all-confings-table';
import { useEffect, useState } from 'react';
import { Loader } from '../loader/loader';
import MultipleSelect from '../components/selectComponent';
import { setSelectedDomain } from '../../store/ConfigurationReducer/configuration.action';
import { DefaultConfigObjectType } from '../../store/ConfigurationReducer/configuration-reducer.default-value';


export default function DisplayAllConfigs() {

    const [loader, setLoader] = useState<boolean>(true);
    const [rows, setRows] = useState<string[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [columnValues, setColumnValues] = useState<Record<string, Record<string, any>>>({});
    const [populatedOptions, setPopulatedOptions] = useState<string[]>([]);
  
    const configs = useSelector(selectConfigs);
    const currentlySelectedDomain = useSelector(selectCurrentDomain);
    const defaultConfigValues = useSelector(selectDefaultConfigValues);
  
    console.log("************* Received configs", configs);
  
    const populateColumnsWithValues = () => {
      const currentColumns: string[] = [];
      const columnsWithValues: Record<string, Record<string, any>> = {}; // To store filtered values per LoB
    
      // Filter default configs based on currently selected domain
      const filteredDefaults = defaultConfigValues.filter(
        (config) => config.domainType === currentlySelectedDomain
      );
    
      // Generate columns from the names in filtered defaults
      filteredDefaults.forEach((config) => {
        currentColumns.push(config.name);
      });
    
      // Iterate through all LoBs in configs to populate values
      Object.entries(configs).forEach(([lobKey, lobData]) => {
        const domainData = lobData[currentlySelectedDomain] || {};
        currentColumns.forEach((columnName) => {
          if (!columnsWithValues[columnName]) {
            columnsWithValues[columnName] = {};
          }
          columnsWithValues[columnName][lobKey] = domainData[columnName] ?? "N/A"; // Use "N/A" if value not found
        });
      });
    
      // Set columns and columnValues
      setColumns(currentColumns); // Use filtered names as column headers
      setColumnValues(columnsWithValues); // Set the column values
    };
    
    
  
    const populateData = () => {
      // Get unique options across all LoBs
      const configOptions: Set<string> = new Set();
  
      // Object.values(configs).forEach((lobData) => {
      //   Object.keys(lobData).forEach((domain) => configOptions.add(domain) );
      // });
  
      Object.keys(defaultConfigValues).forEach((_,index)=>{
        const currentElement : DefaultConfigObjectType = defaultConfigValues[index];
        configOptions.add(currentElement.domainType)
        console.log(currentElement)
      })
      setRows(Object.keys(configs)); // Use lob as rows

      setPopulatedOptions(Array.from(configOptions)); // Convert Set to Array
    };
  
    useEffect(() => {
      if (Object.keys(configs).length === 0) {
        setLoader(true);
      } else {
        populateData();
        setLoader(false);
      }
    }, [configs,defaultConfigValues]);
  
    useEffect(() => {
      if (currentlySelectedDomain) {
        populateColumnsWithValues();
      }
    }, [currentlySelectedDomain]);
  
  return (
    <>
    <div>Display All Configs</div>
    <MultipleSelect options={populatedOptions} value={[currentlySelectedDomain]} onSelect={setSelectedDomain}/>
    {loader ? (<Loader/>) : (<BasicTable columns={columns} columnsWithValues={columnValues}/>)}
    </>
  )
}
