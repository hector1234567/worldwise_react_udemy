import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Product from './pages/Product'
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import { useEffect, useState } from 'react'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'

const BASE_URL = 'http://localhost:9000';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function() {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch(e) {
        console.error('Error: ' + e)
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage/>}></Route>
          <Route path="product" element={<Product/>}></Route>
          <Route path="pricing" element={<Pricing/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="app" element={<AppLayout/>}>
            <Route index element={<Navigate replace to='cities' />}></Route>
            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />}></Route>
            <Route path="cities/:id" element={<City cities={cities} isLoading={isLoading} />}></Route>
            <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />}></Route>
            <Route path="form" element={<Form />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
