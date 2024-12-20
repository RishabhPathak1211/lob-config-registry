import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddNewConfig from './features/addNewConfig/AddNewConfig'; // Import your component
import { useEffect } from 'react';
import { LobComparisonService } from './services/lobComparisonService';
import { setConfigurationValue } from './store/ConfigurationReducer/configuration.action';
import DisplayAllConfigs from './features/displayAllConfig/display-all-configs.component';
function App() {


  useEffect(() => {
    (async () => {
      const service = new LobComparisonService("uat");
      // store.dispatch(setConfigurationValue(service.getLobwiseConfigMapping()))
      setConfigurationValue(await service.getLobwiseConfigMapping())
    })()
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/addNewConfig" element={<AddNewConfig />} />
        <Route path="/displayAllConfig" element={<DisplayAllConfigs />} />
      </Routes>
    </Router>
  );
}

export default App;