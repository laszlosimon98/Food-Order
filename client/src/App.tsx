import Login from "@/features/auth/components/Login";
import Register from "@/features/auth/components/Register";
import Layout from "@/features/shared/components/Layout";
import Home from "@/features/home/components/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "@/features/profile/components/Profile";
import ProtectedRoute from "@/features/shared/components/ProtectedRoute";

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

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
