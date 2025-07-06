// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Importa el hook de autenticación

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRoles } = useAuth(); // Obtiene el array de roles del usuario

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si se especifican roles permitidos y el usuario no tiene NINGUNO de esos roles,
  // redirige a la página de inicio de sesión.
  // Usamos .some() para verificar si al menos uno de los roles del usuario
  // está incluido en los roles permitidos para esta ruta.
  const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role));

  if (allowedRoles && !hasRequiredRole) {
    return <Navigate to="/" replace />;
  }

  // Si el usuario está autenticado y tiene al menos un rol permitido, renderiza los componentes hijos
  return children;
};

export default PrivateRoute;
