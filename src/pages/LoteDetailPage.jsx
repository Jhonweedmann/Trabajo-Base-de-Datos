// src/pages/LoteDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getLotDetails, getBarrelsByLoteId } from "../utils/authService"; // Importa las nuevas funciones

function LoteDetailPage() {
  const { loteId } = useParams(); // Obtiene el parámetro 'loteId' de la URL
  const [lotDetails, setLotDetails] = useState(null);
  const [associatedBarrels, setAssociatedBarrels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Obtener detalles del lote
        const details = await getLotDetails(loteId);
        setLotDetails(details);

        // Obtener barriles asociados a este lote
        const barrels = await getBarrelsByLoteId(loteId);
        setAssociatedBarrels(barrels);

        if (!details) {
          setError("Lote no encontrado.");
        }
      } catch (err) {
        console.error("Error al cargar detalles del lote o barriles:", err);
        setError("No se pudieron cargar los detalles del lote.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loteId]); // Dependencia: loteId para re-ejecutar si cambia

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Cargando detalles del lote...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Link
            to="/barriles"
            className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Volver a Barriles
          </Link>
        </div>
      </div>
    );
  }

  if (!lotDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center">
          <p className="text-gray-600 text-lg mb-4">
            El lote "{loteId}" no fue encontrado.
          </p>
          <Link
            to="/barriles"
            className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Volver a Barriles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Detalles del Lote: {loteId}
        </h1>

        {/* Sección de Ingredientes */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 border-b pb-2">
            Ingredientes
          </h2>
          <p className="text-gray-700 mb-2">
            <strong>Maltas:</strong> {lotDetails.ingredients.maltas.join(", ")}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Lúpulos:</strong>{" "}
            {lotDetails.ingredients.lupulos.join(", ")}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Levadura:</strong> {lotDetails.ingredients.levadura}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Tipo de Fermentación:</strong>{" "}
            {lotDetails.ingredients.tipoFermentacion}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Tiempo de Fermentación:</strong>{" "}
            {lotDetails.ingredients.tiempoFermentacion}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Añadidos Especiales:</strong>{" "}
            {lotDetails.ingredients.anadidosEspeciales.length > 0
              ? lotDetails.ingredients.anadidosEspeciales.join(", ")
              : "Ninguno"}
          </p>
          {lotDetails.description && (
            <p className="text-gray-700 mt-4">
              <strong>Descripción:</strong> {lotDetails.description}
            </p>
          )}
        </div>

        {/* Sección de Trazabilidad */}
        <div className="mb-8 p-6 bg-green-50 rounded-lg shadow-sm border border-green-200">
          <h2 className="text-2xl font-semibold text-green-800 mb-4 border-b pb-2">
            Trazabilidad
          </h2>
          <p className="text-gray-700">
            <strong>Elaborado por:</strong> {lotDetails.elaboratedBy}
          </p>
        </div>

        {/* Sección de Barriles Asociados */}
        <div className="p-6 bg-yellow-50 rounded-lg shadow-sm border border-yellow-200">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4 border-b pb-2">
            Barriles Asociados
          </h2>
          {associatedBarrels.length > 0 ? (
            <ul className="space-y-3">
              {associatedBarrels.map((barrel) => (
                <li
                  key={barrel.ID_barril}
                  className="bg-yellow-100 p-4 rounded-md shadow-sm border border-yellow-200"
                >
                  <p className="text-gray-800">
                    <strong>ID Barril:</strong> {barrel.ID_barril}
                  </p>
                  <p className="text-gray-800">
                    <strong>Nombre Cerveza:</strong> {barrel.Nombre}
                  </p>
                  <p className="text-gray-800">
                    <strong>Capacidad:</strong> {barrel.CapacidadLitros}L
                  </p>
                  <p
                    className={`font-bold ${
                      barrel.isFull ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    Estado:{" "}
                    {barrel.isFull ? "Lleno" : "Parcialmente Lleno/Vacío"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">
              No hay barriles asociados a este lote.
            </p>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/barriles"
            className="inline-block px-6 py-2 bg-indigo-100 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Volver a Barriles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoteDetailPage;
