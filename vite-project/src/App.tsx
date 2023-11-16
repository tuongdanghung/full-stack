import { Route, Routes } from "react-router-dom";
import {
  Cart,
  Checkout,
  Extend,
  Home,
  Login,
  Product,
  Verify,
  ProductDetail,
  Profile,
  HistoryOrder,
  Blog,
  BlogDetail,
  Forgot,
  VerifyGoogle,
  Favorite,
  Contact,
} from "./layout/customer-site/pages";
import {
  ExtendAdmin,
  Dashboard,
  ManagerUsers,
  ManagerProduct,
  ManagerOrder,
  ManagerBrand,
  ManagerCategory,
  ManagerColor,
  ManagerCapacity,
  ManagerBlog,
} from "./layout/admin-site/pages";
import path from "./layout/customer-site/utils/path";
import pathAdmin from "./layout/admin-site/utils/path";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App font-main w-main h-main text-main">
      <div>
        <Routes>
          <Route path={path.PUBLIC} element={<Extend />}>
            <Route path={path.HOME} element={<Home />}></Route>
            <Route path={path.PRODUCTS_CATEGORY} element={<Product />}></Route>

            <Route
              path={path.PRODUCT_DETAIL}
              element={<ProductDetail />}
            ></Route>
            <Route path={path.CONTACT} element={<Contact />}></Route>
            <Route path={path.BLOG_DETAIL} element={<BlogDetail />}></Route>
            <Route path={path.CART} element={<Cart />}></Route>
            <Route path={path.CHECKOUT} element={<Checkout />}></Route>
            <Route path={path.MYPROFILE} element={<Profile />}></Route>
            <Route path={path.HISTORY} element={<HistoryOrder />}></Route>

            <Route path={path.BLOG} element={<Blog />}></Route>
            <Route path={path.FAVORITE} element={<Favorite />}></Route>

            <Route path={path.ALL} element={<Home />}></Route>
          </Route>
          <Route path={pathAdmin.ADMIN} element={<ExtendAdmin />}>
            <Route path={pathAdmin.DASHBOARD} element={<Dashboard />}></Route>
            <Route
              path={pathAdmin.MANAGER_USER}
              element={<ManagerUsers />}
            ></Route>
            <Route
              path={pathAdmin.MANAGER_PRODUCT}
              element={<ManagerProduct />}
            ></Route>
            <Route
              path={pathAdmin.MANAGER_ORDER}
              element={<ManagerOrder />}
            ></Route>
            <Route
              path={pathAdmin.MANAGER_BRAND}
              element={<ManagerBrand />}
            ></Route>
            <Route
              path={pathAdmin.MANAGER_CATEGORY}
              element={<ManagerCategory />}
            ></Route>
            <Route
              path={pathAdmin.MANAGER_COLOR}
              element={<ManagerColor />}
            ></Route>
            <Route
              path={pathAdmin.MANAGER_CAPACITY}
              element={<ManagerCapacity />}
            ></Route>
            <Route
              path={pathAdmin.MANAGER_BLOG}
              element={<ManagerBlog />}
            ></Route>
          </Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.VERIFY_ACCOUNT} element={<Verify />}></Route>

          <Route path={path.VERIFY_GOOGLE} element={<VerifyGoogle />}></Route>

          <Route path={path.FORGOT} element={<Forgot />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
