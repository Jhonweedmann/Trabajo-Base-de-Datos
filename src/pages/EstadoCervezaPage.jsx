// src/pages/EstadoCervezaPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBeerStatus } from "../utils/authService"; // Importa la función para obtener el estado de las cervezas

function EstadoCervezaPage() {
  const [beerStatus, setBeerStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeerStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedStatus = await getBeerStatus();
        setBeerStatus(fetchedStatus);
      } catch (err) {
        console.error("Error al cargar el estado de las cervezas:", err);
        setError("No se pudo cargar el estado de las cervezas.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeerStatus();
  }, []); // Se ejecuta una vez al montar el componente

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Estado de Cervezas
        </h1>

        {loading && (
          <p className="text-center text-gray-600">
            Cargando estado de cervezas...
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading &&
          !error &&
          (beerStatus.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Cerveza
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Estado
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                      Barriles Asociados
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {beerStatus.map((beer) => (
                    <tr
                      key={beer.name}
                      className="hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                        {beer.name}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            beer.status === "Disponible"
                              ? "bg-green-100 text-green-800"
                              : beer.status ===
                                "Bajo Stock / Parcialmente Disponible"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {beer.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {beer.barrels.length > 0 ? (
                          <ul className="list-disc list-inside text-xs">
                            {beer.barrels.map((barrel) => (
                              <li key={barrel.ID_barril}>
                                {barrel.ID_barril} ({barrel.CapacidadLitros}L -{" "}
                                {barrel.isFull ? "Lleno" : "Parcial"})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No hay información de estado de cervezas disponible.
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

export default EstadoCervezaPage;
