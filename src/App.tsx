import Login from './Pages/Login/Login'
import Header from './Components/Header/Header'
import Home from './Pages/Home/Home'
import { Navigate, Route, Routes } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

import './App.css'
import Loading from './Components/Loading/Loading'
import { useEffect } from 'react'
import { CreateUser, GetUser } from './Components/services/UserService.ts/UserService'
import { CreateUserRequest } from './Models/User/CreateUserRequest'
import { useDispatch } from 'react-redux'
import { GetUserCompleted } from './Actions/UserActions'

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.sub) {
      GetUser(user.sub).then((data) => {
        dispatch(GetUserCompleted(data))
      }).catch(() => {
        if (user &&
          user.sub &&
          user.email &&
          user.name) {
          let request: CreateUserRequest = {
            id: user.sub,
            email: user.email,
            name: user.name
          }
          CreateUser(request).catch((err) => {
            console.error('User could not be created', err)
          });
        }
      });
    }
  }, [user])
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
