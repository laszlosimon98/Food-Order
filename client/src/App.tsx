import Login from "@/home/components/Login";
import Register from "@/home/components/Register";
import Layout from "@/shared/components/Layout";
import Home from "features/home/components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
