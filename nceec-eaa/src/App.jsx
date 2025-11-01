import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSettings } from "./context/SettingsContext";
import Navbar from "./components/Navbar";
import PublicNavbar from "./components/PublicNavbar";
import Sidebar from "./components/Sidebar";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import Dashboard from "./components/Dashboard";
import FacilitySetup from "./components/FacilitySetup";
import LogData from "./components/LogData";
import Report from "./components/Report";
import AdminPanel from "./components/AdminPanel";
import Visualization from "./Visualization";
import Home from "./components/Home";
import AwarenessCreation from "./components/AwarenessCreation";
import ApplianceTesting from "./components/ApplianceTesting";
import CapacityBuilding from "./components/CapacityBuilding";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tariff } = useSettings();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [facility, setFacility] = useState({
    name: "Main Training Room",
    area: 120,
    location: "Lagos",
    buildingType: "Educational",
  });
  const [rooms, setRooms] = useState([
    { id: 1, name: "Training Hall", function: "Training Room" },
    { id: 2, name: "Office Block", function: "Office" },
  ]);
  const [equipmentList, setEquipmentList] = useState([
    {
      id: 1,
      name: "LED Panel 40W",
      powerKw: 0.04,
      qty: 12,
      hoursPerDay: 8,
      category: "Lighting",
      room: "Training Hall",
    },
    {
      id: 2,
      name: "Split AC 2.0T",
      powerKw: 2.0,
      qty: 2,
      hoursPerDay: 6,
      category: "HVAC",
      room: "Training Hall",
    },
    {
      id: 3,
      name: "Projector",
      powerKw: 0.3,
      qty: 1,
      hoursPerDay: 4,
      category: "AV",
      room: "Training Hall",
    },
  ]);

  // Load all persisted data on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("nceec_user");
    const savedFacility = localStorage.getItem("nceec_facility");
    const savedRooms = localStorage.getItem("nceec_rooms");
    const savedEquipment = localStorage.getItem("nceec_equipment");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    if (savedFacility) setFacility(JSON.parse(savedFacility));
    if (savedRooms) setRooms(JSON.parse(savedRooms));
    if (savedEquipment) setEquipmentList(JSON.parse(savedEquipment));
  }, []);

  // Persist facility data whenever it changes
  useEffect(() => {
    localStorage.setItem("nceec_facility", JSON.stringify(facility));
  }, [facility]);

  // Persist rooms data whenever it changes
  useEffect(() => {
    localStorage.setItem("nceec_rooms", JSON.stringify(rooms));
  }, [rooms]);

  // Persist equipment data whenever it changes
  useEffect(() => {
    localStorage.setItem("nceec_equipment", JSON.stringify(equipmentList));
  }, [equipmentList]);

  function handleLogin(userData) {
    const data = userData || { name: "Auditor", role: "User" };
    setUser(data);
    setIsAuthenticated(true);
    localStorage.setItem("nceec_user", JSON.stringify(data));
    navigate("/dashboard");
  }

  function handleRegister(userData) {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("nceec_user", JSON.stringify(userData));
    navigate("/dashboard");
  }

  function handleLogout() {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("nceec_user");
    navigate("/");
  }

  function calcEnergy(item) {
    const daily = item.powerKw * item.qty * item.hoursPerDay;
    const monthly = daily * 30;
    const cost = monthly * tariff;
    return { daily, monthly, cost };
  }

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/" replace />;
    return children;
  };

  // Check if current route is public (home, login, register)
  const isPublicRoute = ["/", "/login", "/register"].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Show PublicNavbar for public routes, authenticated Navbar for protected routes */}
      {isPublicRoute ? (
        <PublicNavbar />
      ) : (
        isAuthenticated && (
          <>
            <Navbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              user={user}
              onLogout={handleLogout}
            />
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          </>
        )
      )}

      <main
        className={
          isAuthenticated && !isPublicRoute
            ? "pt-16 lg:pl-64 min-h-screen"
            : "min-h-screen"
        }
      >
        <div className={isAuthenticated && !isPublicRoute ? "p-6" : ""}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="pt-16 p-6">
                  <Home onLogin={() => navigate("/login")} />
                </div>
              }
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LoginScreen onLogin={handleLogin} />
                )
              }
            />

            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <RegisterScreen onRegister={handleRegister} />
                )
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    user={user}
                    facility={facility}
                    equipmentList={equipmentList}
                    tariff={tariff}
                    onNewAudit={() => navigate("/facility-setup")}
                    onNavigate={(p) => navigate("/" + p)}
                    calcEnergy={calcEnergy}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/facility-setup"
              element={
                <ProtectedRoute>
                  <FacilitySetup
                    facility={facility}
                    onSave={(f) => {
                      setFacility(f);
                      navigate("/data-input");
                    }}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/log-data"
              element={
                <ProtectedRoute>
                  <LogData
                    equipmentList={equipmentList}
                    setEquipmentList={setEquipmentList}
                    rooms={rooms}
                    setRooms={setRooms}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/data-input"
              element={
                <ProtectedRoute>
                  <LogData
                    equipmentList={equipmentList}
                    setEquipmentList={setEquipmentList}
                    rooms={rooms}
                    setRooms={setRooms}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/visualization"
              element={
                <ProtectedRoute>
                  <Visualization
                    facility={facility}
                    equipmentList={equipmentList}
                    tariff={tariff}
                    calcEnergy={calcEnergy}
                    onGenerateReport={() => navigate("/report")}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <Report
                    facility={facility}
                    equipmentList={equipmentList}
                    tariff={tariff}
                    calcEnergy={calcEnergy}
                    onBack={() => navigate("/dashboard")}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel onBack={() => navigate("/dashboard")} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/awareness"
              element={
                <ProtectedRoute>
                  <AwarenessCreation
                    equipmentList={equipmentList}
                    calcEnergy={calcEnergy}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/appliance-testing"
              element={
                <ProtectedRoute>
                  <ApplianceTesting equipmentList={equipmentList} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/training"
              element={
                <ProtectedRoute>
                  <CapacityBuilding />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>

      {isAuthenticated && (
        <footer className="lg:pl-64 pt-16 text-center py-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <span className="font-semibold text-green-600 dark:text-green-400">
            NCEEC-EAA
          </span>{" "}
          - National Centre for Energy Efficiency & Conservation Audit App
        </footer>
      )}
    </div>
  );
}
