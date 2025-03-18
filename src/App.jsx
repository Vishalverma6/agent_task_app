
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import UploadTask from './components/core/dashboard/task/UploadTask'
import AgentTask from './components/core/dashboard/task/AgentTask'
import Agent from './components/core/dashboard/addAgent/Agent'

function App() {
  const {token} = useSelector((state) => state.auth)
  
  return (
    <>
    <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/login' element={<Login/>}/>


         {
          token && (
            <Route path='/dashboard' element={<Dashboard/>}>
              <Route path='/dashboard/add-agent' element={<Agent/>}/>
              <Route path='/dashboard/upload-file' element={<UploadTask/>}/>
              <Route path='/dashboard/get-task' element={<AgentTask/>}/>

            </Route>
          )
         }
      </Routes>
    </>
  )
}

export default App
