import Layout from "@/shared/layout/components/Layout";
import Home from "features/home/components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
