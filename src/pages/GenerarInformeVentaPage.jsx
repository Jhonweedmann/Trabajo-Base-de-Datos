// src/pages/GenerarInformeVentaPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthProvider"; // Importa el hook de autenticación
import { getSales, getEmployees } from "../utils/authService"; // Importa las funciones para ventas y empleados
import { ROLES } from "../utils/constants"; // Importa las constantes de roles

function GenerarInformeVentaPage() {
  const { user, userRoles } = useAuth();
  const isAdmin = userRoles.includes(ROLES.ADMIN);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [idEvento, setIdEvento] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]); // Lista de empleados para el dropdown

  const [reportSales, setReportSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar la lista de empleados al montar el componente
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const fetchedEmployees = await getEmployees();
        setEmployees(fetchedEmployees);
      } catch (err) {
        console.error("Error al cargar empleados:", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    setReportSales([]); // Limpiar ventas anteriores

    try {
      const filters = {
        startDate: startDate || null,
        endDate: endDate || null,
        idEvento: idEvento || null,
        // Si el usuario es admin, puede filtrar por cualquier empleado.
        // Si no es admin, solo puede ver sus propias ventas, por lo que su sellerId se pasa automáticamente.
        sellerId: isAdmin ? selectedEmployeeId || null : user?.id_empleado,
        isAdmin: isAdmin, // Pasar el estado de admin a la función getSales
      };

      const fetchedSales = await getSales(filters);
      setReportSales(fetchedSales);
    } catch (err) {
      console.error("Error al generar el informe de ventas:", err);
      setError("No se pudo generar el informe de ventas.");
    } finally {
      setLoading(false);
    }
  };

  // Función para generar PDF (placeholder)
  const handleGeneratePdf = () => {
    alert("Funcionalidad de generación de PDF no implementada en este mock.");
    // En una implementación real, aquí usarías una librería como jsPDF o html2pdf
    // para generar y descargar el PDF del informe.
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Generar Informe de Ventas
        </h1>

        {/* Controles de Filtro */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha Inicio
            </label>
            <input
              type="date"
              id="startDate"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha Fin
            </label>
            <input
              type="date"
              id="endDate"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="idEvento"
              className="block text-sm font-medium text-gray-700"
            >
              ID Evento (Opcional)
            </label>
            <input
              type="text"
              id="idEvento"
              placeholder="Ej: EVT-001"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={idEvento}
              onChange={(e) => setIdEvento(e.target.value)}
            />
          </div>
          {isAdmin && ( // Solo mostrar el selector de empleado si es admin
            <div>
              <label
                htmlFor="employee"
                className="block text-sm font-medium text-gray-700"
              >
                Empleado (Opcional)
              </label>
              <select
                id="employee"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
              >
                <option value="">Todos los Empleados</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.id})
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="md:col-span-2 lg:col-span-3 flex justify-center gap-4 mt-4">
            <button
              onClick={handleGenerateReport}
              className="px-6 py-2 bg-blue-600 text-black font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? "Generando..." : "Generar Informe"}
            </button>
            <button
              onClick={handleGeneratePdf}
              className="px-6 py-2 bg-purple-600 text-black font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              disabled={loading || reportSales.length === 0}
            >
              Descargar PDF
            </button>
          </div>
        </div>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        {reportSales.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Resultados del Informe
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      ID Venta
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Vendedor
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Cliente
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Fecha
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Evento
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Total
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Detalles
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportSales.map((sale) => (
                    <tr
                      key={sale.saleId}
                      className="hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {sale.saleId}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {sale.sellerId}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {sale.customerName}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {sale.saleDate}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {sale.idEvento || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        ${sale.totalAmount.toLocaleString("es-CL")}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        <ul className="list-disc list-inside text-xs">
                          {sale.itemDetails.map((item, idx) => (
                            <li key={idx}>
                              {item.item} ({item.quantity} uds)
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportSales.length === 0 && !loading && !error && (
          <p className="text-center text-gray-600 mt-8">
            No hay ventas para los filtros seleccionados.
          </p>
        )}

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

export default GenerarInformeVentaPage;
