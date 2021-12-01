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

const BodyWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: white;
`

const FooterWrapper = styled.div`
  margin-top: auto;
`

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
            {//<Route exact path="/admin" element={AuthService.hasRole("admin") ? <Admin /> : AuthService.doLogin()} />
            }

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