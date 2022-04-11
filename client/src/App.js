import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Users/Features/Home";
import NotfoundPage from "./components/Users/Pages/NotfoundPage/NotfoundPage";
import { ForgotPasswordPage } from "./components/Users/Features/UserModal/pages/ForgotPasswordPage";
import Profilepage from "./components/Users/Features/UserModal/pages/Profilepage";
import ProtectedRoute from "./ProtectedRoutes";
import { ResetPasswordPage } from "./components/Users/Features/UserModal/pages/ResetPasswordPage";
import LandingPage from "./components/Users/Features/Landing/LandingPage";
import CreateForm from "./components/Users/Pages/Create/CreateForm";
import Details from "./components/Users/Pages/Details/Details";
import CartPage from "./components/Users/Pages/CartPage/CartPage";

import Checkout from "./components/Users/Pages/Checkout/Checkout";
import SuccessBuy from "./components/Users/Pages/SuccessBuy";
import LoadingPage from "./components/Users/Features/Loading/LoadingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/new-flight" element={<CreateForm />} />
        <Route path="/home" element={<Home />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route exact path="/detailspage:id" element={<Details />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route exact path="/profile" element={<Profilepage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
           <Route exact path="/success" element={<SuccessBuy />} />
        </Route>

        <Route exact path="/reset-password" element={<ResetPasswordPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/loadingtest" element={<LoadingPage />} /> 
      

      
        <Route exact path="*" element={<NotfoundPage />} />
      </Routes>
    </div>
  );
}

export default App;