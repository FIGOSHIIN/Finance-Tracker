import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Signup from './pages/Signup/Signup.js';
import Home from './pages/Home/Home.js';
import Navbar from './components/Navbar.js';
import { useAuthContext } from './hooks/useAuthContext.js';

function App() {

  const {authIsReady, user } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
          <BrowserRouter>
            <Navbar/>
            <Routes>
              {/* Protect the Home route: if no user, redirect to Login */}
              <Route 
                path="/" 
                element={user ? <Home /> : <Navigate to="/Login" />} 
              />
              {/* Protect the Login route: if user is logged in, redirect to Home */}
              <Route 
                path='/Login' 
                element={!user ? <Login /> : <Navigate to="/" />} 
              />
              {/* Protect the Signup route: if user is logged in, redirect to Home */}
              <Route 
                path='/Signup' 
                element={!user ? <Signup /> : <Navigate to="/" />} 
              />
            </Routes>
          </BrowserRouter>
      )}
    </div>
  );
}

export default App;

