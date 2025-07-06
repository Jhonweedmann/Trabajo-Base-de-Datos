// src/components/AuthProvider.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser as mockLoginUser } from "../utils/authService"; // Importa la función de login simulada

// Crea el contexto de autenticación
const AuthContext = createContext(null);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor de autenticación que envuelve la aplicación
export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información del usuario (incluyendo el array de roles)
  const [user, setUser] = useState(null); // { id: '...', roles: ['...', '...'] }

  // Función para simular el inicio de sesión
  const login = async (rut, empleadoId) => {
    try {
      const userData = await mockLoginUser(rut, empleadoId);
      if (userData) {
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  };

  // Función para simular el cierre de sesión
  const logout = () => {
    setUser(null);
  };

  // El valor que se proporcionará a los componentes que consuman el contexto
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // Booleano para saber si el usuario está autenticado
    userRoles: user ? user.roles : [], // Ahora es un array de roles
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
