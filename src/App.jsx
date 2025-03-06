import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import { AuthProvider, useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>; // Prevents flickering while checking auth
    if (!user) return <Navigate to="/login" />; // Redirect if not authenticated

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Dashboard" element={
                        <ProtectedRoute><Dashboard /></ProtectedRoute>
                    } />
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App