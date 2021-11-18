import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Navigate, Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Login from './components/authorization/Login';
import Orders from './components/pages/Orders';
import NotFound from './components/pages/NotFound';
import { logout } from './services/auth';
import CreateOrder from './components/pages/CreateOrder';
import SeeBill from './components/pages/SeeBill';

function App() {

  const jwt = window.localStorage['jwt'];
  
  if(jwt){
    return(
      <div>
        <Router>
          <Navbar expand bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
              Delivery App
            </Navbar.Brand>
            <Nav>
              <Nav.Link as={Link} to="/orders">
                Orders
              </Nav.Link>
              <Button style={{right: '10px', position: 'absolute'}} onClick={() => logout()}>Logout</Button>
            </Nav>
          </Navbar>
          <Container style={{paddingTop: '25px'}}>
            <Routes>
              <Route path="/orders" element={<Orders />} />
              <Route path="/" element={<Navigate replace to="/orders"/>} />
              <Route path="/orders/create" element={<CreateOrder/>}/>
              <Route path="/orders/bills/:id" element={<SeeBill/>} />
              <Route element={<NotFound/>} />
            </Routes>
          </Container>
        </Router>
      </div>
    )
  } else {
    return(
      <Container>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login"/>} />
          </Routes>
        </Router>
      </Container>
    )
  }

}

export default App;
