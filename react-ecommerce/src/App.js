import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { AuthProvider } from './components/Context/AuthContext';
import PrivateRoute from './components/Route/PrivateRoute';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Register from './components/Register/Register';
import OrderForm from './components/OrderForm/OrderForm';
import AddProduct from './components/AddProducts/AddProduct';


const App = () => {
  // const {token} =useAuth(); 
  return (
    <AuthProvider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element = { <Register/> } />
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='' element={<Home/>}/>
            <Route path='cart' element = { <Cart/> }/>
            <Route path='order' element = { <OrderForm/> }/>
            <Route path='addproduct' element = { <AddProduct/> }/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
