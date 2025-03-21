import Login from './Pages/Login/Login'
import Header from './Components/Header/Header'
import Home from './Pages/Home/Home'
import { Navigate, Route, Routes } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

import './App.css'
import Loading from './Components/Loading/Loading'

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <div className='app-container'>
        {!isAuthenticated && <Navigate to="/login" />}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
