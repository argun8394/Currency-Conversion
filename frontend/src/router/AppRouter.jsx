import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Currency from "../pages/Currency";
import CurrencyHistory from "../pages/CurrencyHistory";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/currencyHistory" element={<CurrencyHistory />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route  />
        </Routes>
      <Footer/>

      </Router>
    </>
  );
};

export default AppRouter;