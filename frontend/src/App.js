import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { Navigate } from "react-router-dom"

import AuthService from 'services/Auth/AuthService'

import styled from 'styled-components'

import { ThemeProvider } from '@material-ui/styles'
import MainTheme from 'styles/MainTheme'

import Header from 'components/common/Header/Header'
import Footer from 'components/common/Footer/Footer'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Browse from 'pages/Browse/Browse'
import Upload from 'pages/Upload/Upload'
import NotFound from './pages/NotFound/NotFound'
import Caff from 'pages/Caff/Caff'
import Admin from 'pages/Admin/Admin'
import { useEffect } from 'react'
import axios from 'axios'

const BodyWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: white;
`

const FooterWrapper = styled.div`
  margin-top: auto;
`

axios.interceptors.request.use(
  request => {
    if (AuthService.isLoggedIn()) {
      request.headers['userId'] = AuthService.getUsername()
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.status === 401) {
      AuthService.doLogin()
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

function App() {

  return (
    <ThemeProvider theme={MainTheme}>
      <Router>
        <BodyWrapper>
          <Header />
          <Routes>
            <Route exact path="/" element={<Navigate to="/browse" />} />
            <Route exact path="/browse" element={AuthService.isLoggedIn() ? <Browse /> : AuthService.doLogin()} />
            <Route exact path="/browse/:id" element={AuthService.isLoggedIn() ? <Caff /> : AuthService.doLogin()} />
            <Route exact path="/upload" element={AuthService.isLoggedIn() ? <Upload /> : AuthService.doLogin()} />
            <Route exact path="/admin" element={(AuthService.isLoggedIn() && AuthService.hasRole("admin_user")) ? <Admin /> : (AuthService.isLoggedIn() ? <Navigate to='/browse' /> : <NotFound />)} />

            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar
            newestOnTop
            limit={5}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
          />
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </BodyWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;