// src/pages/VentasPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"; // Importa el hook de autenticación
import { getSales } from "../utils/authService"; // Importa la función para obtener ventas
import { ROLES } from "../utils/constants"; // Importa las constantes de roles

function VentasPage() {
  const { user, userRoles } = useAuth(); // Obtiene el usuario y sus roles
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determina si el usuario actual es un administrador
  const isAdmin = userRoles.includes(ROLES.ADMIN);

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedSales;
        // Prepara el objeto de filtros para la función getSales
        const filters = {
          isAdmin: isAdmin,
          sellerId: isAdmin ? null : user?.id_empleado, // Si no es admin, filtra por su propio ID
        };

        fetchedSales = await getSales(filters); // Llama a getSales con el objeto de filtros

        setSales(fetchedSales);
      } catch (err) {
        console.error("Error al cargar ventas:", err);
        setError("No se pudieron cargar las ventas.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      // Asegúrate de que el usuario esté cargado antes de buscar ventas
      fetchSales();
    }
  }, [user, isAdmin]); // Dependencias: user y isAdmin para re-ejecutar si cambian

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Página de Ventas
        </h1>

        {loading && (
          <p className="text-center text-gray-600">Cargando ventas...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading &&
          !error &&
          (sales.length > 0 ? (
            <div className="space-y-6">
              {sales.map((sale) => (
                <div
                  key={sale.saleId}
                  className="bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Venta ID: {sale.saleId}
                  </h2>
                  <p className="text-gray-700">
                    <strong>Vendedor:</strong> {sale.sellerId}
                  </p>
                  <p className="text-gray-700">
                    <strong>Cliente:</strong> {sale.customerName}
                  </p>
                  <p className="text-gray-700">
                    <strong>Fecha de Venta:</strong> {sale.saleDate}
                  </p>
                  <p className="text-gray-700">
                    <strong>ID Evento:</strong> {sale.idEvento || "N/A"}{" "}
                    {/* Mostrar ID Evento */}
                  </p>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Detalles de Productos:
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {sale.itemDetails.map((item, index) => (
                        <li key={index}>
                          {item.item}: {item.quantity} unidades @ $
                          {item.unitPrice.toLocaleString("es-CL")} c/u
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-4">
                    Total Venta: ${sale.totalAmount.toLocaleString("es-CL")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No hay ventas disponibles para mostrar.
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

export default VentasPage;
