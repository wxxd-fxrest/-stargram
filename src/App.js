import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from './Route/Auth';
import LogIn from './Component/LogIn';
import SignUp from './Component/SignUp';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import Home from './Route/Home';
import Write from './Component/Write';
import Profile from './Route/Profile';
import Edit from './Component/Edit';
import AboutFeed from './Route/AboutFeed';
import AboutProfile from './Route/AboutProfile';
import DirectMessage from './Route/DirectMessage';
import Dm from './Component/Dm';
import AllDirectMessage from './Route/AllDirectMessage';
import FeedProps from './Component/FeedProps';

const App = () => {
  const {currentUser} = useContext(AuthContext) ; 

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/Auth" /> 
    }
    return children ;
  }; 

  return (
    <div className='App'>
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
                <Route path='/AllDirectMessage' element={
                  <ProtectedRoute>
                    <AllDirectMessage />
                  </ProtectedRoute> } />
                <Route path='/Auth' element={<Auth />} />
                <Route path='/LogIn' element={<LogIn />} />
                <Route path='/SignUp' element={<SignUp />} />
                <Route path='/Dm/:uid/:uid' element={<Dm />} />
                <Route path='/feed/:uid/:DocID' element={<FeedProps />} />
                <Route path='/Profile/:displayName/:uid' element={<AboutProfile />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
