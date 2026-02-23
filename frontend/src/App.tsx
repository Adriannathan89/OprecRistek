import { Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardPages from './dashboard/dashboardPages'
import AboutPages from './about/aboutPages'
import AuthPages from './auth/authPages'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AboutPages />} />
      <Route path="/auth" element={<AuthPages />} />
      <Route path='/dashboard' element={<DashboardPages />} />
    </Routes>
  )
}

export default App
