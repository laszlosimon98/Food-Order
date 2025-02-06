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
import ReviewForm from "@/features/review/components/ReviewForm";
import Dashboard from "@/features/dashboard/components/Dashboard";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import { RolesEnum } from "@/utils/roles";
import CheckUser from "@/features/shared/components/CheckUser";
import DashboardCategories from "@/features/dashboard/components/category/DashboardCategories";
import DashboardCategoryForm from "@/features/dashboard/components/category/DashboardCategoryForm";
import DashboardFoodForm from "@/features/dashboard/components/food/DashboardFoodForm";
import DashboardFoods from "@/features/dashboard/components/food/DashboardFoods";
import DashboardUsers from "@/features/dashboard/components/users/DashboardUsers";

function App() {
  return (
    <Routes>
      <Route element={<CheckUser />}>
        <Route path="/" element={<Layout />}>
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

          <Route element={<ProtectedRoute allowedRoles={[RolesEnum.USER]} />}>
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="order-summary" element={<OrderSummary />} />
            <Route path="favorite-foods" element={<FavoriteFood />} />

            <Route path="reviews">
              <Route path=":reviewId/food/:foodId" element={<ReviewForm />} />
              <Route path="addreview/:foodId" element={<ReviewForm />} />
            </Route>
          </Route>

          <Route
            element={<ProtectedRoute allowedRoles={[RolesEnum.EMPLOYEE]} />}
          >
            <Route path="orders" element={<AllOrder />} />
          </Route>
        </Route>

        {/* Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={[RolesEnum.ADMIN]} />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route element={<Dashboard />}>
              <Route path="categories">
                <Route index element={<DashboardCategories />} />
                <Route path="create" element={<DashboardCategoryForm />} />
                <Route
                  path="modify/:categoryId"
                  element={<DashboardCategoryForm />}
                />
              </Route>

              <Route path="foods">
                <Route index element={<DashboardFoods />} />
                <Route path="create" element={<DashboardFoodForm />} />
                <Route path="modify/:foodId" element={<DashboardFoodForm />} />
              </Route>

              <Route path="users" element={<DashboardUsers />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
