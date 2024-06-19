import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Home from "./routes/home";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth-context";
import Dashboard from "./routes/dashboard";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("User", !!currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <div className="bg-slate-50 min-h-[100dvh]">
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="dashboard"
          element={currentUser ? <Dashboard /> : <Home />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
