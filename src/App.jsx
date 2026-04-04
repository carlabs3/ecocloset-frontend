import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";
import Results from "./pages/Results";
import History from "./pages/History";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/test"
          element={
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          }
        />
        <Route
          path="/results/:id"
          element={
            <PrivateRoute>
              <Results />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
