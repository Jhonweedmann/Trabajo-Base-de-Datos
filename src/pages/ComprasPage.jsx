// src/pages/ComprasPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPurchases } from "../utils/authService"; // Importa la función para obtener compras

function ComprasPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
      setError(null);
      try {
        // Como esta página es solo para administradores, siempre obtenemos todas las compras
        const fetchedPurchases = await getPurchases();
        setPurchases(fetchedPurchases);
      } catch (err) {
        console.error("Error al cargar compras:", err);
        setError("No se pudieron cargar las compras.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []); // El array de dependencias está vacío porque solo se carga una vez al montar

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Página de Compras
        </h1>

        {loading && (
          <p className="text-center text-gray-600">Cargando compras...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading &&
          !error &&
          (purchases.length > 0 ? (
            <div className="space-y-6">
              {purchases.map((purchase) => (
                <div
                  key={purchase.purchaseId}
                  className="bg-gray-100 p-6 rounded-lg shadow-sm border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Compra ID: {purchase.purchaseId}
                  </h2>
                  <p className="text-gray-700">
                    <strong>Proveedor:</strong> {purchase.supplier}
                  </p>
                  <p className="text-gray-700">
                    <strong>Fecha de Transacción:</strong>{" "}
                    {purchase.transactionDate}
                  </p>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Detalles de Insumos:
                    </h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {purchase.itemDetails.map((item, index) => (
                        <li key={index}>
                          {item.item}: {item.quantity} unidades @ $
                          {item.unitPrice.toLocaleString("es-CL")} c/u
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-4">
                    Total Pagado: ${purchase.totalPaid.toLocaleString("es-CL")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No hay compras disponibles para mostrar.
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

export default ComprasPage;
