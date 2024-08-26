import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./context/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Project from "./pages/Project";

const App: React.FC = () => {
  const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
  }) => {
    const { userLoggedIn, loading } = useAuth();

    if (loading) {
      return (
        <div className="h-screen w-screen bg-gray-100">
          <div className="h-full w-full flex flex-col justify-center items-center">
            <p className="text-black">Loading...</p>
          </div>
        </div>
      );
    }

    return userLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route
              path="app"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="project/:id"
              element={
                <PrivateRoute>
                  <Project />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
