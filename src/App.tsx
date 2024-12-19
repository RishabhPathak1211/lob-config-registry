import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddNewConfig from './features/addNewConfig/AddNewConfig'; // Import your component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/addNewConfig" element={<AddNewConfig />} />
      </Routes>
    </Router>
  );
}

export default App;