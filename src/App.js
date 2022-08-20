import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import LoginPage from "./pages/LoginPage";
import jwtDecode from "jwt-decode";

import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import "./utils/font-awesome";
import { doLogout } from "./redux/actions/authActions";
import CreateData from "./pages/Form/CreateData";
import EditData from "./pages/Form/EditData";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="product" element={<ProductPage />} />
            <Route path="product/add-product" element={<CreateData />} />
            <Route path="product/edit-product/:id" element={<EditData />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("authInfo"));
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (user && isLoggedIn) {
    try {
      const decodedToken = jwtDecode(user.accessToken);
      console.log("ini decode ", decodedToken);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        console.log("expired token ", decodedToken.exp);
        dispatch(doLogout());
      }
    } catch (error) {
      console.log("invalid token");
      dispatch(doLogout());
    }
    return <HomePage />;
  }

  return <Navigate to={redirectPath} replace />;
};

export default App;
