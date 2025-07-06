// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"; // Importa el hook de autenticación

function LoginPage() {
  const [rut, setRut] = useState("");
  const [empleadoId, setEmpleadoId] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Obtiene la función de login del contexto
  const navigate = useNavigate(); // Hook para la navegación programática

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpia errores anteriores

    // Intenta iniciar sesión
    const success = await login(rut, empleadoId);

    if (success) {
      // Si el login es exitoso, redirige al dashboard
      navigate("/dashboard");
    } else {
      // Si falla, muestra un mensaje de error
      setError("RUT o ID de empleado incorrectos.");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="rut"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              RUT
            </label>
            <input
              type="text"
              id="rut"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="empleadoId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ID Empleado
            </label>
            <input
              type="password" // Usar tipo password para ID_empleado por seguridad básica
              id="empleadoId"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
              value={empleadoId}
              onChange={(e) => setEmpleadoId(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Ingresar
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          <span className="font-semibold">
            Ejemplos de credenciales (RUT/ID_empleado):
          </span>
          <br />
          Admin: 11111111-1 / admin123
          <br />
          Vendedor: 22222222-2 / vendedor123
          <br />
          Productor: 33333333-3 / productor123
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
