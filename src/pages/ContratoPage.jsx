// src/pages/ContratoPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"; // Importa el hook de autenticación
import { getContracts } from "../utils/authService"; // Importa la función para obtener contratos
import { ROLES } from "../utils/constants"; // Importa las constantes de roles

function ContratoPage() {
  const { user, userRoles } = useAuth(); // Obtiene el usuario y sus roles
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determina si el usuario actual es un administrador
  const isAdmin = userRoles.includes(ROLES.ADMIN);

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedContracts;
        if (isAdmin) {
          // Si es admin, obtiene todos los contratos
          fetchedContracts = await getContracts(null, true);
        } else {
          // Si no es admin, obtiene solo el contrato del usuario actual
          fetchedContracts = await getContracts(user?.rut);
        }
        setContracts(fetchedContracts);
      } catch (err) {
        console.error("Error al cargar contratos:", err);
        setError("No se pudieron cargar los contratos.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      // Asegúrate de que el usuario esté cargado antes de buscar contratos
      fetchContracts();
    }
  }, [user, isAdmin]); // Dependencias: user y isAdmin para re-ejecutar si cambian

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Página de Contratos
        </h1>

        {loading && (
          <p className="text-center text-gray-600">Cargando contratos...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading &&
          !error &&
          (contracts.length > 0 ? (
            <div className="space-y-6">
              {contracts.map((contract) => (
                <div
                  key={contract.contractId}
                  className="bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Contrato ID: {contract.contractId}
                  </h2>
                  <p className="text-gray-700">
                    <strong>Nombre de Usuario:</strong> {contract.userName}
                  </p>
                  <p className="text-gray-700">
                    <strong>RUT:</strong> {contract.userRut}
                  </p>
                  <p className="text-gray-700">
                    <strong>Horas Fijas:</strong> {contract.fixedHours} horas
                  </p>
                  <p className="text-gray-700">
                    <strong>Pago por Hora Fija:</strong> $
                    {contract.fixedRatePerHour.toLocaleString("es-CL")}
                  </p>
                  <p className="text-gray-700">
                    <strong>Pago por Hora Extra:</strong> $
                    {contract.extraRatePerHour.toLocaleString("es-CL")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No hay contratos disponibles para mostrar.
            </p>
          ))}

        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="inline-block px-6 py-2 bg-indigo-100 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Volver al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContratoPage;
