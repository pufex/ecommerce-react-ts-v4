import { Routes, Route } from 'react-router-dom'

import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'

import Home from './pages/Home/Home'
import Partners from './pages/Partners/Partners'
import Sales from './pages/Sales/Sales'
import Product from './pages/Product/Product'
import Cart from './pages/Cart/Cart'
import PayForm from './pages/PayForm/PayForm'
import Conclusion from './pages/Conclusion/Conclusion'
import ErrorComponent from './components/ErrorComponent/ErrorComponent'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Account from './pages/Account/Account'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import BeforeForm from './pages/BeforeForm/BeforeForm'

import ThemeProvider from './contexts/Theme'
import IconProvider from './contexts/Icon'
import UseCartContextProvider from './hooks/useCart'
import AuthProvider from './contexts/Database'

import './assets/App.css'

function App() {

  return <>
    <UseCartContextProvider>
      <ThemeProvider>
        <IconProvider>
          <AuthProvider>
            <Nav />
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
              <Route
                path="/partners"
                element={<Partners />}
              />
              <Route
                path="/sales"
                element={<Sales />}
              />
              <Route 
                path='/product'
                element={<Product />}
              />
              <Route 
                path='/cart'
                element={<Cart />}
              />
              <Route 
                path='/before-form'
                element={<BeforeForm />}
              />
              <Route 
                path='/pay-form'
                element={<PayForm />}
              />
              <Route 
                path='/conclusion'
                element={<Conclusion />}
              />
              <Route 
                path='/log-in'
                element={<Login />}
              />
              <Route 
                path='/register'
                element={<Register />}
              />
              <Route 
                path='/account-settings'
                element={<Account />}
              />
              <Route 
                path='/reset-password'
                element={<ResetPassword />}
              />
              <Route
                path="/*"
                element={<ErrorComponent />}
              />
            </Routes>
            <Footer />
          </AuthProvider>
        </IconProvider>
      </ThemeProvider>
    </UseCartContextProvider>
  </>
}

export default App
