import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from './Route/Auth';
import LogIn from './Component/LogIn';
import SignUp from './Component/SignUp';

const App = () => {

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route>
                <Route path='/' element={<Auth />} />
                <Route path='/LogIn' element={<LogIn />} />
                <Route path='/SignUp' element={<SignUp />} />
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
