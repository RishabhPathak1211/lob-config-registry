import { useSelector } from 'react-redux';
import { selectConfigs, selectCurrentDomain } from '../../store/ConfigurationReducer/configuration.selector'
import BasicTable from './components/display-all-confings-table';
import { useEffect, useState } from 'react';
import { Loader } from '../loader/loader';
import MultipleSelect from '../components/selectComponent';
import { setSelectedDomain } from '../../store/ConfigurationReducer/configuration.action';


export default function DisplayAllConfigs() {

    const [loader, setLoader] = useState<boolean>(true);
    const [rows, setRows] = useState<string[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [columnValues, setColumnValues] = useState<Record<string, Record<string, any>>>({});
    const [populatedOptions, setPopulatedOptions] = useState<string[]>([]);
  
    const configs = useSelector(selectConfigs);
    const currentlySelectedDomain = useSelector(selectCurrentDomain);
  
    console.log("************* Received configs", configs);
  
    const populateColumnsWithValues = () => {
      const currentColumns: Set<string> = new Set();
      const columnsWithValues: Record<string, Record<string, any>> = {}; // To store values per LoB
  
      // Iterate through all LoBs
      Object.entries(configs).forEach(([lobKey, lobData]) => {
        const domainData = lobData[currentlySelectedDomain] || {};
  
        // Iterate through all columns (items) in the domain data
        Object.keys(domainData).forEach((column) => {
          currentColumns.add(column);
        });
  
        // Ensure every column has a value for the current LoB, defaulting to undefined
        currentColumns.forEach((column) => {
          if (!columnsWithValues[column]) {
            columnsWithValues[column] = {};
          }
          columnsWithValues[column][lobKey] = domainData[column] ?? undefined;
        });
      });
  
      setColumns(Array.from(currentColumns)); // Convert Set to Array
      setColumnValues(columnsWithValues); // Set the column values
    };
  
    const populateData = () => {
      // Get unique options across all LoBs
      const configOptions: Set<string> = new Set();
  
      Object.values(configs).forEach((lobData) => {
        Object.keys(lobData).forEach((domain) => configOptions.add(domain) );
      });
  
      setRows(Object.keys(configs)); // Use config keys as rows
      setPopulatedOptions(Array.from(configOptions)); // Convert Set to Array
    };
  
    useEffect(() => {
      if (Object.keys(configs).length === 0) {
        setLoader(true);
      } else {
        populateData();
        setLoader(false);
      }
    }, [configs]);
  
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
