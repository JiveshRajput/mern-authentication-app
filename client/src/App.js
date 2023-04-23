import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Username from './component/Username'
import Register from './component/Register'
import Password from './component/Password'
import Profile from './component/Profile'
import Recovery from './component/Recovery'
import Reset from './component/Reset'
import PageNotFound from './component/PageNotFound'
import { Toaster } from 'react-hot-toast';
import { AuthUser, ProtectRoute } from './middlewares/auth';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Username />} />
          <Route path='/register' element={<Register />} />
          <Route path='/password' element={<ProtectRoute><Password /></ProtectRoute>} />
          <Route path='/recovery' element={<ProtectRoute><Recovery /></ProtectRoute>} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/profile' element={<AuthUser><Profile /></AuthUser>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
