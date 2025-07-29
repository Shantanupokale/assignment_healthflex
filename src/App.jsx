import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css'
import Home from './pages/Home';
import CreateTimer from './pages/CreateTimer';
import History from './pages/History';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<CreateTimer/>}/>
          <Route path='/history' element={<History/>}/>
        </Routes>
    </Router>
     
    </>
  )
}

export default App
