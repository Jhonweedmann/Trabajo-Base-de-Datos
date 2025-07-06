// src/pages/BarrilesPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBarrels } from "../utils/authService"; // Importa la función para obtener barriles

function BarrilesPage() {
  const navigate = useNavigate();
  const [initialBarrels, setInitialBarrels] = useState([]); // Para almacenar los barriles del mock
  const [filteredBarrels, setFilteredBarrels] = useState([]); // Para mostrar los barriles filtrados/agregados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBarrel, setSelectedBarrel] = useState(null); // Para el panel de detalles
  const [showAddBarrelForm, setShowAddBarrelForm] = useState(false); // Para mostrar/ocultar el formulario
  const [newBarrelData, setNewBarrelData] = useState({
    // Estado para el nuevo barril
    ID_barril: "",
    Nombre: "",
    SaborPrincipal: "",
    FechaElaboracion: "",
    Lote: "",
    GradoAlcoholico: "",
    CapacidadLitros: "",
    isFull: true,
  });

  useEffect(() => {
    const fetchBarrels = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedBarrels = await getBarrels();
        setInitialBarrels(fetchedBarrels);
        setFilteredBarrels(fetchedBarrels); // Inicialmente, los filtrados son todos
      } catch (err) {
        console.error("Error al cargar barriles:", err);
        setError("No se pudieron cargar los barriles.");
      } finally {
        setLoading(false);
      }
    };

    fetchBarrels();
  }, []); // Carga los barriles una vez al montar el componente

  // Efecto para filtrar barriles cada vez que cambia el término de búsqueda o los barriles iniciales/agregados
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const currentBarrels = initialBarrels.concat(
      // Añadir el nuevo barril si el formulario no está visible y hay datos válidos
      showAddBarrelForm ? [] : newBarrelData.ID_barril ? [newBarrelData] : []
    );

    const filtered = currentBarrels.filter(
      (barrel) =>
        barrel.Nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
        barrel.Lote.toLowerCase().includes(lowerCaseSearchTerm) ||
        barrel.FechaElaboracion.includes(lowerCaseSearchTerm)
    );
    setFilteredBarrels(filtered);
  }, [searchTerm, initialBarrels, newBarrelData, showAddBarrelForm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBarrelClick = (barrel) => {
    setSelectedBarrel(barrel);
  };

  const handleLoteClick = (loteId) => {
    navigate(`/lote/${loteId}`); // Navega a la página de detalles del lote
  };

  const handleNewBarrelChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBarrelData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddBarrelSubmit = (e) => {
    e.preventDefault();
    // Generar un ID único para el nuevo barril (simple para el mock)
    const newId = `BRL-${Date.now()}`;
    const barrelToAdd = { ...newBarrelData, ID_barril: newId };

    // Añadir el nuevo barril a la lista de barriles filtrados para que se muestre temporalmente
    // No lo añadimos a initialBarrels para que sea "momentáneo"
    setFilteredBarrels((prevBarrels) => [...prevBarrels, barrelToAdd]);

    // Limpiar el formulario y ocultarlo
    setNewBarrelData({
      ID_barril: "",
      Nombre: "",
      SaborPrincipal: "",
      FechaElaboracion: "",
      Lote: "",
      GradoAlcoholico: "",
      CapacidadLitros: "",
      isFull: true,
    });
    setShowAddBarrelForm(false);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Gestión de Barriles
        </h1>

        {/* Botón para agregar nuevo barril */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => setShowAddBarrelForm(!showAddBarrelForm)}
            className="px-6 py-2 text-gray-700 font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            {showAddBarrelForm ? "Cancelar" : "Agregar Nuevo Barril"}
          </button>
          <Link
            to="/dashboard"
            className="inline-block px-6 py-2 bg-indigo-100 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Volver al Dashboard
          </Link>
        </div>

        {/* Formulario para agregar nuevo barril */}
        {showAddBarrelForm && (
          <form
            onSubmit={handleAddBarrelSubmit}
            className="bg-blue-50 p-6 rounded-lg shadow-inner mb-8"
          >
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              Nuevo Barril
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="Nombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de Cerveza
                </label>
                <input
                  type="text"
                  name="Nombre"
                  id="Nombre"
                  value={newBarrelData.Nombre}
                  onChange={handleNewBarrelChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="SaborPrincipal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sabor Principal
                </label>
                <input
                  type="text"
                  name="SaborPrincipal"
                  id="SaborPrincipal"
                  value={newBarrelData.SaborPrincipal}
                  onChange={handleNewBarrelChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="FechaElaboracion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Elaboración
                </label>
                <input
                  type="date"
                  name="FechaElaboracion"
                  id="FechaElaboracion"
                  value={newBarrelData.FechaElaboracion}
                  onChange={handleNewBarrelChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="Lote"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lote
                </label>
                <input
                  type="text"
                  name="Lote"
                  id="Lote"
                  value={newBarrelData.Lote}
                  onChange={handleNewBarrelChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="GradoAlcoholico"
                  className="block text-sm font-medium text-gray-700"
                >
                  Grado Alcohólico (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="GradoAlcoholico"
                  id="GradoAlcoholico"
                  value={newBarrelData.GradoAlcoholico}
                  onChange={handleNewBarrelChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="CapacidadLitros"
                  className="block text-sm font-medium text-gray-700"
                >
                  Capacidad (Litros)
                </label>
                <input
                  type="number"
                  name="CapacidadLitros"
                  id="CapacidadLitros"
                  value={newBarrelData.CapacidadLitros}
                  onChange={handleNewBarrelChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFull"
                  id="isFull"
                  checked={newBarrelData.isFull}
                  onChange={handleNewBarrelChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isFull"
                  className="ml-2 block text-sm font-medium text-gray-700"
                >
                  ¿Está Lleno?
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              Crear Barril
            </button>
          </form>
        )}

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por Nombre, Lote o Fecha de Elaboración..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {loading && (
          <p className="text-center text-gray-600">Cargando barriles...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBarrels.length > 0 ? (
              filteredBarrels.map((barrel) => (
                <div
                  key={barrel.ID_barril}
                  className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out"
                  onClick={() => handleBarrelClick(barrel)}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {barrel.Nombre} (ID: {barrel.ID_barril})
                  </h3>
                  <p className="text-gray-700">
                    Sabor: {barrel.SaborPrincipal}
                  </p>
                  <p className="text-gray-700">
                    Fecha Elaboración: {barrel.FechaElaboracion}
                  </p>
                  <p className="text-gray-700">
                    Lote:{" "}
                    <span
                      className="text-blue-600 hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoteClick(barrel.Lote);
                      }}
                    >
                      {barrel.Lote}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    Grado Alcohólico: {barrel.GradoAlcoholico}%
                  </p>
                  <p className="text-gray-700">
                    Capacidad: {barrel.CapacidadLitros}L
                  </p>
                  <p
                    className={`font-bold ${
                      barrel.isFull ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Estado:{" "}
                    {barrel.isFull ? "Lleno" : "Parcialmente Lleno/Vacío"}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No se encontraron barriles que coincidan con la búsqueda.
              </p>
            )}
          </div>
        )}

        {/* Panel de Detalles del Barril (Modal simple) */}
        {selectedBarrel && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative">
              <button
                onClick={() => setSelectedBarrel(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
                Detalles del Barril
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>ID Barril:</strong> {selectedBarrel.ID_barril}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Nombre:</strong> {selectedBarrel.Nombre}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Sabor Principal:</strong>{" "}
                {selectedBarrel.SaborPrincipal}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Fecha de Elaboración:</strong>{" "}
                {selectedBarrel.FechaElaboracion}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Lote:</strong>{" "}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLoteClick(selectedBarrel.Lote);
                    setSelectedBarrel(null);
                  }}
                >
                  {selectedBarrel.Lote}
                </span>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Grado Alcohólico:</strong>{" "}
                {selectedBarrel.GradoAlcoholico}%
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Capacidad:</strong> {selectedBarrel.CapacidadLitros}{" "}
                Litros
              </p>
              <p
                className={`font-bold ${
                  selectedBarrel.isFull ? "text-green-600" : "text-red-600"
                }`}
              >
                <strong>Estado:</strong>{" "}
                {selectedBarrel.isFull ? "Lleno" : "Parcialmente Lleno/Vacío"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BarrilesPage;
