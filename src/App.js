import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import "./styles/home.css";
import "./styles/slick.css";
import "./styles/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./Components/Utils/LoadingSpinner";
import CookieNotice from "./Components/Utils/CookieNotice";
import ScrollToTop from "./Components/ScrollToTop";
import HomePage from "./Pages/HomePage";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useDispatch, useSelector } from "react-redux";
import { hideLoadingHandler, showLoadingHandler } from "./redux/loadingReducer";
// ..
AOS.init();
const App = () => {
  const { isLoading } = useSelector((state) => state.loading);
  return (
    <>
      {isLoading ? <LoadingSpinner /> : null} 
      <ToastContainer />
      <CookieNotice />
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Router>
      <ScrollToTop />
    </>
  );
};

export default App;
