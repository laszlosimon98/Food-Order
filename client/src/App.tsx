import Login from "@/features/auth/components/Login";
import Register from "@/features/auth/components/Register";
import Layout from "@/features/shared/components/Layout";
import Home from "@/features/home/components/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "@/features/profile/components/Profile";
import ProtectedRoute from "@/features/shared/components/ProtectedRoute";
import OrderSummary from "@/features/order/components/OrderSummary";
import MyOrders from "@/features/order/components/MyOrders";

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
            <ProtectedRoute>
              <MyOrders />
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
