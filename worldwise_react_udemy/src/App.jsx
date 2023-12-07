import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Product from './Product'
import Homepage from './HomePage'
import Pricing from './Pricing'
import PageNotFound from './PageNotFound'

function App() {
  return (
    <>
      <h1>React Router!</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}></Route>
          <Route path="product" element={<Product/>}></Route>
          <Route path="pricing" element={<Pricing/>}></Route>
          <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
