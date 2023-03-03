import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from './Route/Auth';
import LogIn from './Component/LogIn';
import SignUp from './Component/SignUp';
import { useContext, useState } from 'react';
import { AuthContext } from './Context/AuthContext';
import Home from './Route/Home';
import Write from './Component/Write';
import Profile from './Route/Profile';
import Edit from './Component/Edit';

const App = () => {
  const {currentUser} = useContext(AuthContext) ; 

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/Auth" /> 
    }
    return children ;
  }; 

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route>
                <Route index element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute> } />
                <Route path='/Write' element={
                  <ProtectedRoute>
                  <Write />
                  </ProtectedRoute> } />
                <Route path='/Profile' element={
                  <ProtectedRoute>
                  <Profile />
                  </ProtectedRoute> } />
                <Route path='/Edit' element={
                  <ProtectedRoute>
                  <Edit />
                  </ProtectedRoute> } />
                <Route path='/Auth' element={<Auth />} />
                <Route path='/LogIn' element={<LogIn />} />
                <Route path='/SignUp' element={<SignUp />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
