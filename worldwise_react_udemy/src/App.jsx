import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { lazy } from 'react'

const Product = lazy(() => import('./pages/Product'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));

import CityList from './components/CityList'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage/>}></Route>
            <Route path="product" element={<Product/>}></Route>
            <Route path="pricing" element={<Pricing/>}></Route>
            <Route path="login" element={<Login/>}></Route>
              <Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                  <Route index element={<Navigate replace to='cities' />}></Route>
                  <Route path="cities" element={<CityList />}></Route>
                  <Route path="cities/:id" element={<City  />}></Route>
                  <Route path="countries" element={<CountryList />}></Route>
                  <Route path="form" element={<Form />}></Route>
              </Route>
            <Route path="*" element={<PageNotFound/>}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
