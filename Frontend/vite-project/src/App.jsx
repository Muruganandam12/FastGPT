import React from 'react'
import Sidebar from './components/Sidebar'
import {Route, Routes} from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Library from './pages/Library'

const App = () => {
  return (
    <>
    <div className='dark:bg-linear-to-b from-[#242124] to-[#000000]
    dark:text-white'>
    <div className='flex h-screen w-screen'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<ChatBox/>} />
        <Route path='/credits' element={<Credits/>} />
        <Route path='/library' element={<Library/>} />
      </Routes>

    </div>
    </div>
    </>
  )
}

export default App