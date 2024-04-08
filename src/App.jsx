import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Index from './Views/index'
import Details from './Views/Details'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/pokemon/:id' element={<Details/>}/>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
