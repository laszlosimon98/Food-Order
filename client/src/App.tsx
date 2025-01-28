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

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />

        <Route path=":foodId" element={<Home />} />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="order-summary"
          element={
            <ProtectedRoute>
              <OrderSummary />
            </ProtectedRoute>
          }
        />

        <Route
          path="my-orders"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="favorite-foods"
          element={
            <ProtectedRoute>
              <FavoriteFood />
            </ProtectedRoute>
          }
        />

        <Route
          path="orders"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <AllOrder />
            </ProtectedRoute>
          }
        />

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
