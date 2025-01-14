import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddNewConfig from './features/addNewConfig/AddNewConfig'; // Import your component
import { useEffect } from 'react';
import { LobComparisonService } from './services/lobComparisonService';
import { setConfigurationValue, setDefaultConfigValues } from './store/ConfigurationReducer/configuration.action';
import DisplayAllConfigs from './features/displayAllConfig/display-all-configs.component';
import { MantineProvider} from '@mantine/core';

function App() {


  useEffect(() => {
    (async () => {
      const service = new LobComparisonService("uat");
      setConfigurationValue(await service.getLobwiseConfigMapping())
      setDefaultConfigValues(await service.getDefaultConfigData())
    })()
  }, []);

  return (
    <MantineProvider>
    <Router>
      <Routes>
        <Route path="/addNewConfig" element={<AddNewConfig />} />
        <Route path="/" element={<DisplayAllConfigs />} />
      </Routes>
    </Router>
    </MantineProvider>
  );
}

export default App;