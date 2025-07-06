// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ComprasPage from "./pages/ComprasPage";
import EstadoCervezaPage from "./pages/EstadoCervezaPage";
import VentasPage from "./pages/VentasPage";
import BarrilesPage from "./pages/BarrilesPage"; // Importar BarrilesPage
import LoteDetailPage from "./pages/LoteDetailPage"; // Importar LoteDetailPage
import ContratoPage from "./pages/ContratoPage";
import GenerarInformeVentaPage from "./pages/GenerarInformeVentaPage";
import GenerarInformeComprasPage from "./pages/GenerarInformeComprasPage";
import { ROLES } from "./utils/constants";

function App() {
  return (
    // BrowserRouter envuelve toda la aplicación para habilitar el enrutamiento
    <Router>
      {/* AuthProvider proporciona el contexto de autenticación a toda la aplicación */}
      <AuthProvider>
        {/* Routes define las diferentes rutas de la aplicación */}
        <Routes>
          {/* Ruta para la página de inicio de sesión, accesible para todos */}
          <Route path="/" element={<LoginPage />} />

          {/* Rutas protegidas que requieren autenticación y roles específicos */}
          {/* DashboardPage: Accesible para todos los roles autenticados */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                allowedRoles={[ROLES.ADMIN, ROLES.VENDEDOR, ROLES.PRODUCTOR]}
              >
                <DashboardPage />
              </PrivateRoute>
            }
          />

          {/* ComprasPage: Solo accesible para administradores */}
          <Route
            path="/compras"
            element={
              <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                <ComprasPage />
              </PrivateRoute>
            }
          />

          {/* EstadoCervezaPage: Accesible para todos los roles autenticados */}
          <Route
            path="/estado-cerveza"
            element={
              <PrivateRoute
                allowedRoles={[ROLES.ADMIN, ROLES.VENDEDOR, ROLES.PRODUCTOR]}
              >
                <EstadoCervezaPage />
              </PrivateRoute>
            }
          />

          {/* VentasPage: Accesible para administradores y vendedores */}
          <Route
            path="/ventas"
            element={
              <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.VENDEDOR]}>
                <VentasPage />
              </PrivateRoute>
            }
          />

          {/* BarrilesPage: Accesible para todos los roles autenticados */}
          <Route
            path="/barriles"
            element={
              <PrivateRoute
                allowedRoles={[ROLES.ADMIN, ROLES.VENDEDOR, ROLES.PRODUCTOR]}
              >
                <BarrilesPage />
              </PrivateRoute>
            }
          />

          {/* LoteDetailPage: Ruta para ver detalles de un lote específico */}
          {/* Se pasa el ID del lote como parámetro en la URL */}
          <Route
            path="/lote/:loteId"
            element={
              <PrivateRoute
                allowedRoles={[ROLES.ADMIN, ROLES.VENDEDOR, ROLES.PRODUCTOR]}
              >
                <LoteDetailPage />
              </PrivateRoute>
            }
          />

          {/* ContratoPage: Accesible para todos los roles autenticados */}
          <Route
            path="/contrato"
            element={
              <PrivateRoute
                allowedRoles={[ROLES.ADMIN, ROLES.VENDEDOR, ROLES.PRODUCTOR]}
              >
                <ContratoPage />
              </PrivateRoute>
            }
          />

          {/* GenerarInformeVentaPage: Accesible para administradores y vendedores */}
          <Route
            path="/generar-informe-venta"
            element={
              <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.VENDEDOR]}>
                <GenerarInformeVentaPage />
              </PrivateRoute>
            }
          />

          {/* GenerarInformeComprasPage: Solo accesible para administradores */}
          <Route
            path="/generar-informe-compras"
            element={
              <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
                <GenerarInformeComprasPage />
              </PrivateRoute>
            }
          />

          {/* Puedes añadir una ruta para 404 Not Found si lo deseas */}
          {/* <Route path="*" element={<div>404 - Página no encontrada</div>} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
