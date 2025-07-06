// src/pages/DashboardPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"; // Importa el hook de autenticación
import { ROLES } from "../utils/constants"; // Importa las constantes de roles

function DashboardPage() {
  const { user, userRoles, logout } = useAuth(); // Obtiene el usuario, el array de roles y la función de logout
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    navigate("/"); // Redirige a la página de login después de cerrar sesión
  };

  // Función auxiliar para verificar si el usuario tiene un rol específico
  const hasRole = (role) => userRoles.includes(role);

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Bienvenido, {user?.id_empleado} ({userRoles.join(", ")}){" "}
            {/* Muestra todos los roles */}
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Cerrar Sesión
          </button>
        </div>

        <p className="text-lg text-gray-700 mb-10">
          Selecciona una opción para continuar:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sección de Operaciones */}
          <div className="col-span-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Operaciones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Compras (Solo Admin) */}
              {hasRole(ROLES.ADMIN) && (
                <Link to="/compras" className="block">
                  <div className="p-6 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 transition duration-150 ease-in-out text-center">
                    <h3 className="text-xl font-semibold text-blue-800">
                      Compras
                    </h3>
                    <p className="text-blue-600 text-sm">(Solo Admin)</p>
                  </div>
                </Link>
              )}

              {/* Estado Cerveza (Todos) */}
              {/* No se necesita chequeo de rol aquí ya que todos pueden acceder */}
              <Link to="/estado-cerveza" className="block">
                <div className="p-6 bg-green-100 rounded-lg shadow-md hover:bg-green-200 transition duration-150 ease-in-out text-center">
                  <h3 className="text-xl font-semibold text-green-800">
                    Estado Cerveza
                  </h3>
                  <p className="text-green-600 text-sm">(Todos)</p>
                </div>
              </Link>

              {/* Ventas (Admin y Vendedor) */}
              {(hasRole(ROLES.ADMIN) || hasRole(ROLES.VENDEDOR)) && (
                <Link to="/ventas" className="block">
                  <div className="p-6 bg-purple-100 rounded-lg shadow-md hover:bg-purple-200 transition duration-150 ease-in-out text-center">
                    <h3 className="text-xl font-semibold text-purple-800">
                      Ventas
                    </h3>
                    <p className="text-purple-600 text-sm">
                      (Admin y Vendedor)
                    </p>
                  </div>
                </Link>
              )}

              {/* Barriles (Todos) */}
              {/* No se necesita chequeo de rol aquí ya que todos pueden acceder */}
              <Link to="/barriles" className="block">
                <div className="p-6 bg-yellow-100 rounded-lg shadow-md hover:bg-yellow-200 transition duration-150 ease-in-out text-center">
                  <h3 className="text-xl font-semibold text-yellow-800">
                    Barriles
                  </h3>
                  <p className="text-yellow-600 text-sm">(Todos)</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Sección de Información Personal */}
          <div className="col-span-full mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Información Personal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Contrato (Todos) */}
              {/* No se necesita chequeo de rol aquí ya que todos pueden acceder */}
              <Link to="/contrato" className="block">
                <div className="p-6 bg-orange-100 rounded-lg shadow-md hover:bg-orange-200 transition duration-150 ease-in-out text-center">
                  <h3 className="text-xl font-semibold text-orange-800">
                    Contrato
                  </h3>
                  <p className="text-orange-600 text-sm">(Todos)</p>
                </div>
              </Link>

              {/* Generar Informe Venta (Admin y Vendedor) */}
              {(hasRole(ROLES.ADMIN) || hasRole(ROLES.VENDEDOR)) && (
                <Link to="/generar-informe-venta" className="block">
                  <div className="p-6 bg-teal-100 rounded-lg shadow-md hover:bg-teal-200 transition duration-150 ease-in-out text-center">
                    <h3 className="text-xl font-semibold text-teal-800">
                      Generar Informe Venta
                    </h3>
                    <p className="text-teal-600 text-sm">(Admin y Vendedor)</p>
                  </div>
                </Link>
              )}

              {/* Generar Informe Compras (Solo Admin) */}
              {hasRole(ROLES.ADMIN) && (
                <Link to="/generar-informe-compras" className="block">
                  <div className="p-6 bg-red-100 rounded-lg shadow-md hover:bg-red-200 transition duration-150 ease-in-out text-center">
                    <h3 className="text-xl font-semibold text-red-800">
                      Generar Informe Compras
                    </h3>
                    <p className="text-red-600 text-sm">(Solo Admin)</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
