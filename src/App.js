import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Signup from './pages/Signup/Signup.js';
import Home from './pages/Home/Home.js';
import Navbar from './components/Navbar.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

