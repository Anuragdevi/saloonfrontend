import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Landingpage from './components/Landing_auth_pages/Landingpage';
import Signup from './components/Landing_auth_pages/Signup';
import Login from './components/Landing_auth_pages/Login';
import Forgotpassword from './components/Landing_auth_pages/Forgotpassword';
import Updatepassword from './components/Landing_auth_pages/Updatepassword';
import Homepage from './components/Landing_auth_pages/Homepage';
import Profile from './components/Landing_auth_pages/Profile';
import CreateStoreForm from './components/Landing_auth_pages/CreateStoreForm'
import UserAppointments from './components/Landing_auth_pages/UserAppointments';
import Dashboard from './components/Landing_auth_pages/Dashboard'
import ProductList from './components/Landing_auth_pages/ProductList';
import Addtocart from './components/Landing_auth_pages/Addtocart';
import CheckoutPage from './components/Landing_auth_pages/CheckoutPage';
import MyOrders from './components/Landing_auth_pages/MyOrders';
function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' Component={Landingpage}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/login' Component={Login}/>
            <Route path='/forgotpassword' Component={Forgotpassword}/>
            <Route path='/updatepassword' Component={Updatepassword}/>
            <Route path='/homepage' Component={Homepage}/>
            <Route path='/profile' Component={Profile}/>
            <Route path='/store' Component={CreateStoreForm}/>
            <Route path='/uappointments' Component={UserAppointments}/>
            <Route path='/dashboard' Component={Dashboard}/>
            <Route path='/productlist' Component={ProductList}/>
            <Route path='/addtocart' Component={Addtocart}/>
            <Route path='/checkout' Component={CheckoutPage}/>
            <Route path='/myorders' Component={MyOrders}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
