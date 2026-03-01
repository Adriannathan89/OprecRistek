import { Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardPages from './dashboard/dashboardPages'
import AboutPages from './about/aboutPages'
import AuthPages from './auth/authPages'
import FormDetailPage from './forms/formDetailPage'
import FormAnswerPage from './formAnswer/formAnswerPage'
import WindowHandleLocation from './formAnswer/windowHandleLocation'
import FormResponsePage from './formResponse/formResponsePage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AboutPages />} />
      <Route path="/auth" element={<AuthPages />} />
      <Route path='/dashboard' element={<DashboardPages />} />
      <Route path='/form/:formId' element={<FormDetailPage />} />
      <Route path='/form/:formId/answer' element={<WindowHandleLocation />} />
      <Route path='/form/:formId/answer/:sectionPosition' element={<FormAnswerPage />} key={location.pathname} />
      <Route path='/form/:formId/finish/:userTakingFormId' element={<FormResponsePage />} />
    </Routes>
  )
}

export default App
