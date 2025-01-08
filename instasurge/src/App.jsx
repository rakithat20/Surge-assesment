import './App.css'
import { BrowserRouter as Router  } from 'react-router-dom'
import Home from './pages/Home/Home'

function App() {

  return (
    <Router>
      <div className='w-full bg-black min-h-screen'>
        <Home/>
      </div>
    </Router>
  )
}

export default App
