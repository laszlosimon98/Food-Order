import Login from "@/features/auth/components/Login";
import Register from "@/features/auth/components/Register";
import Layout from "@/features/shared/components/Layout";
import Home from "@/features/home/components/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "@/features/profile/components/Profile";
import ProtectedRoute from "@/features/shared/components/ProtectedRoute";
import OrderSummary from "@/features/order/components/OrderSummary";
import MyOrders from "@/features/order/components/MyOrders";
import FavoriteFood from "@/features/food/components/FavoriteFood";
import AllOrder from "@/features/order/components/AllOrder";
import FoodDetail from "@/features/food/components/FoodDetail";
import AddReview from "@/features/review/components/AddReview";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />

        <Route path="foods">
          <Route index element={<Home />} />
          <Route path=":foodId" element={<FoodDetail />} />
        </Route>

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="order-summary" element={<OrderSummary />} />
          <Route path="favorite-foods" element={<FavoriteFood />} />
          <Route path="reviews">
            <Route path="addreview/:foodId" element={<AddReview />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
          <Route path="orders" element={<AllOrder />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
