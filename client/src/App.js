import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Username from './component/Username'
import Register from './component/Register'
import Password from './component/Password'
import Profile from './component/Profile'
import Recovery from './component/Recovery'
import Reset from './component/Reset'
import PageNotFound from './component/PageNotFound'

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Username />} />
            <Route path='/register' element={<Register />} />
            <Route path='/password' element={<Password />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/recovery' element={<Recovery />} />
            <Route path='/reset' element={<Reset />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
