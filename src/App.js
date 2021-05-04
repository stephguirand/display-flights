//import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Find from './FindFlights/Find';
import FindMyApi from './FindFlights/FindMyApi';

function App() {

  return (
    <div className="App">
      {/* <Find /> */}
      <FindMyApi/>
    </div>
  );
}

export default App;
