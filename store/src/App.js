import logo from './logo.svg';
import './App.css';

import NavbarComponent from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // stylesheets for bootstrap components
import {Container} from 'react-bootstrap';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import CartProvider from './CartContext'; // para poder usarlo en toda nuestra app


//localhost:3000 -> Home
//localhost:3000/success -> Success

function App() {
  return (
    <CartProvider> {/* para poder usarlo en toda nuestra app */}
      <Container>
        <NavbarComponent/>
        <BrowserRouter>
          <Routes>
            <Route index element={<Store />}/>
            <Route path ="success" element={<Success />}/>
            <Route path ="cancel" element={<Cancel />}/>
          </Routes>
        </BrowserRouter>
      </Container>
    </CartProvider>
  )
}

export default App;
