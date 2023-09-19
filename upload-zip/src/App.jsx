import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Detail from './page/Detail'

function App() {

  return (
    <div className=' h-full  '>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
