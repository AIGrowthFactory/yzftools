import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Project from "./pages/Project";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/app" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;