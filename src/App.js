import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRouter from "./AdminRouter";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useStateValue } from "./StateProvider";

const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Search = lazy(() => import("./Pages/Search"));
const Register = lazy(() => import("./Pages/Register"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Affiliate = lazy(() => import("./Pages/Affiliate"));
const Orders = lazy(() => import("./Pages/Orders"));
const Reset = lazy(() => import("./Pages/Reset"));
const Withdraw = lazy(() => import("./Pages/Withdraw"));
const Payments = lazy(() => import("./Pages/Payments"));
const Settings = lazy(() => import("./Pages/Settings"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const Receipt = lazy(() => import("./Pages/Receipt"));
const Cart = lazy(() => import("./Pages/Cart"));
const Help = lazy(() => import("./Pages/Help"));
const Not = lazy(() => import("./Pages/Not"));
const Shop = lazy(() => import("./Pages/Shop"));
const Categories = lazy(() => import("./Pages/Categories"));
const Product = lazy(() => import("./Pages/Product"));
const Admin = lazy(() => import("./Pages/Admin"));
const NewProduct = lazy(() => import("./Pages/NewProduct"));

function App() {
  let [, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch({
            type: "LOGGED",
            user: { ...docSnap.data() },
          });
        } else {
          //dispatch();
        }
      }
    });
    return () => {};
  }, [dispatch]);

  return (
    <div>
      <Suspense fallback={<div className="loader"></div>}>
        <p className="notify">Item added to cart</p>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/:affiliate" element={<Home />} />
          <Route path="/search" index element={<Search />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Categories />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <AdminRouter>
                <Admin />
              </AdminRouter>
            }
          />
          <Route
            path="/admin/new-product"
            element={
              <AdminRouter>
                <NewProduct />
              </AdminRouter>
            }
          />
          <Route
            path="/dashboard/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/affiliate"
            element={
              <PrivateRoute>
                <Affiliate />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/withdraw"
            element={
              <PrivateRoute>
                <Withdraw />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/payments"
            element={
              <PrivateRoute>
                <Payments />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Not />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
