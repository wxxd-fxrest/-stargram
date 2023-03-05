import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from './Route/Auth';
import LogIn from './Component/LogIn';
import SignUp from './Component/SignUp';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext';
import Home from './Route/Home';
import Write from './Component/Write';
import Profile from './Route/Profile';
import Edit from './Component/Edit';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { UserInfoContext } from './Context/UserInfoContext';
import AboutFeed from './Route/AboutFeed';

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
                <Route path='/feed/:uid/:DocID' element={<AboutFeed />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
