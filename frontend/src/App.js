import Home from './components/pages/home'
import Login from './components/pages/login'
import SuccessLogin from './components/pages/success-login'
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }/>
        <Route path="/login" element={<Login />} />
        <Route path="/login/success" element={<SuccessLogin />} />
      </Routes>
    </>
  );
}

export default App;
