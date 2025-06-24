import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './home/Home';
import Login from './pages/Login';
import Restaurants from './pages/Restaurants';
import { CartProvider } from './pages/cartcontex';
import Account from './pages/Account';
import Categories from './home/Categories';
import Navs from './navs/navs';
import RestaurantMenu from './pages/ResMenu';
import Cart from './pages/Cart';
import Cafes from './pages/coffe';
import CoffeMenu from './pages/CofMenu';
import Groceries from './pages/groceries';
import ProcessPayment from './pages/processpayment';
import Orders from './pages/orders';
import SwaiPay from './pages/swaypay';
import PhoneLogin from "./pages/phonelogin";
import ProtectedRoute from './ProtectedRoute';
import Signup from "./pages/Signup";
import {AuthProvider} from "./context/AuthContext";
import MyAccount from "./pages/AccountPage/myaccount";
import Rewards from "./pages/AccountPage/Rewards";
import ReferFriend from "./pages/AccountPage/ReferAFriend";
import Vouchers from "./pages/AccountPage/vochers";
import SwaiPro from "./pages/AccountPage/swaypro";
import GetHelp from "./pages/AccountPage/gethelp";
import AboutApp from "./pages/AccountPage/aboutus";
import Employee from "./pages/Employee";
import Admin from "./pages/Admin";
import AdminProtectedRoute from "./AdminProtectedRoute";
import EmployeeProtectedRoute from "./EmployeeProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/phone-login" || location.pathname === "/signup" || location.pathname === "/admin" || location.pathname === "/employee" ;

  return (
      <>
        {!hideNav && <Navs />}
        {!hideNav && <Categories />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/phone-login" element={<PhoneLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
          <Route path="/employee" element={<EmployeeProtectedRoute ><Employee /></EmployeeProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ><Admin /></AdminProtectedRoute>} />
          <Route path="/restaurants" element={<ProtectedRoute><Restaurants /></ProtectedRoute>} />
          <Route path="/restaurant/:name" element={<ProtectedRoute><RestaurantMenu /></ProtectedRoute>} />
          <Route path="/cafe" element={<ProtectedRoute><Cafes /></ProtectedRoute>} />
          <Route path="/cafe/:name" element={<ProtectedRoute><CoffeMenu /></ProtectedRoute>} />
          <Route path="/groceries" element={<ProtectedRoute><Groceries /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/acc" element={<ProtectedRoute><MyAccount /></ProtectedRoute>} />
          <Route path="rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
          <Route path="/refer" element={<ProtectedRoute><ReferFriend /></ProtectedRoute>} />
          <Route path="/vouchers" element={<ProtectedRoute><Vouchers /></ProtectedRoute>} />
          <Route path="/swai-pro" element={<ProtectedRoute><SwaiPro/></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><GetHelp /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutApp /></ProtectedRoute>} />
          <Route path="/process-payment" element={<ProtectedRoute><ProcessPayment /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/swai-pay" element={<ProtectedRoute><SwaiPay /></ProtectedRoute>} />
        </Routes>
      </>
  );
};

const App = () => (
   < AuthProvider>
     <CartProvider>
       <HashRouter>
           <AppContent />
       </HashRouter>
     </CartProvider>
   </AuthProvider>
);

export default App;
