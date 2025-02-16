import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import CartProtectedRoute from "./auth/CartProtectedRoute";
import { isAdmin, isAuthenticate } from "./auth/fetchApi";
import ProtectedRoute from "./auth/ProtectedRoute";
import Home from "./home";
import ProductByCategory from "./home/ProductByCategory";
import { LayoutContext } from "./layout";
import { layoutReducer, layoutState } from "./layout/layoutContext";
import PageNotFound from "./layout/PageNotFound";
import CheckoutPage from "./order/CheckoutPage";
import ProductDetails from "./productDetails";
import WishList from "./wishlist";

export {
  AdminProtectedRoute,
  CartProtectedRoute, CheckoutPage, Home, isAdmin,
  isAuthenticate, LayoutContext, layoutReducer, layoutState, PageNotFound, ProductByCategory, ProductDetails, ProtectedRoute, WishList
};

