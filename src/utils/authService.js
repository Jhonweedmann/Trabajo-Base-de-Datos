// src/utils/authService.js
import { ROLES } from "./constants"; // Importa las constantes de roles

// Esta función simula una llamada a una API de autenticación.
// En un proyecto real, aquí harías una petición HTTP a tu backend.
export const loginUser = async (rut, empleadoId) => {
  // Simulación de credenciales y roles
  // Ahora, 'roles' es un array, permitiendo múltiples roles por usuario.
  const mockUsers = {
    "11111111-1": {
      id_empleado: "admin123",
      // Un administrador puede tener todos los roles
      roles: [ROLES.ADMIN, ROLES.VENDEDOR, ROLES.PRODUCTOR],
      name: "Admin User",
      rut: "11111111-1", // Añadir RUT al objeto de usuario para fácil acceso
    },
    "22222222-2": {
      id_empleado: "vendedor123",
      // Un vendedor también puede ser productor
      roles: [ROLES.VENDEDOR, ROLES.PRODUCTOR],
      name: "Vendedor User",
      rut: "22222222-2",
    },
    "33333333-3": {
      id_empleado: "productor123",
      // Un productor solo es productor en este ejemplo, pero podría tener más roles
      roles: [ROLES.PRODUCTOR],
      name: "Productor User",
      rut: "33333333-3",
    },
    "44444444-4": {
      id_empleado: "superuser",
      // Un usuario con todos los roles
      roles: [ROLES.ADMIN, ROLES.VENDEDOR, ROLES.PRODUCTOR],
      name: "Super User",
      rut: "44444444-4",
    },
  };

  // Simula un retraso de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = mockUsers[rut];

  // Verifica si el RUT existe y si el ID_empleado coincide
  if (user && user.id_empleado === empleadoId) {
    return user; // Retorna el objeto de usuario si las credenciales son válidas
  } else {
    console.warn(
      "Intento de login fallido para RUT:",
      rut,
      "ID_empleado:",
      empleadoId
    );
    return null;
  }
};

// Mock de datos de contratos
const mockContracts = [
  {
    contractId: "CON-001",
    userName: "Admin User",
    userRut: "11111111-1",
    fixedHours: 160,
    fixedRatePerHour: 25000,
    extraRatePerHour: 35000,
  },
  {
    contractId: "CON-002",
    userName: "Vendedor User",
    userRut: "22222222-2",
    fixedHours: 120,
    fixedRatePerHour: 18000,
    extraRatePerHour: 28000,
  },
  {
    contractId: "CON-003",
    userName: "Productor User",
    userRut: "33333333-3",
    fixedHours: 180,
    fixedRatePerHour: 20000,
    extraRatePerHour: 30000,
  },
  {
    contractId: "CON-004",
    userName: "Super User",
    userRut: "44444444-4",
    fixedHours: 170,
    fixedRatePerHour: 27000,
    extraRatePerHour: 38000,
  },
];

// Función para obtener contratos (simulada)
export const getContracts = async (userRut = null, isAdmin = false) => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula un retraso

  if (isAdmin) {
    return mockContracts; // Si es admin, retorna todos los contratos
  } else if (userRut) {
    // Si no es admin, retorna solo el contrato del usuario especificado
    return mockContracts.filter((contract) => contract.userRut === userRut);
  }
  return []; // Si no hay RUT y no es admin, no retorna nada
};

// Mock de datos de compras
const mockPurchases = [
  {
    purchaseId: "PUR-001",
    supplier: "Malta Premium S.A.",
    itemDetails: [
      { item: "Malta Pale Ale", quantity: 500, unitPrice: 850 },
      { item: "Lúpulo Cascade", quantity: 10, unitPrice: 15000 },
    ],
    totalPaid: 440000, // 500*850 + 10*15000 = 425000 + 15000 = 440000
    transactionDate: "2024-06-01",
  },
  {
    purchaseId: "PUR-002",
    supplier: "Levaduras Express",
    itemDetails: [
      { item: "Levadura Ale (paquete)", quantity: 20, unitPrice: 7000 },
    ],
    totalPaid: 140000, // 20*7000 = 140000
    transactionDate: "2024-06-15",
  },
  {
    purchaseId: "PUR-003",
    supplier: "Envases y Barriles Ltda.",
    itemDetails: [
      { item: "Barril Acero Inox 50L", quantity: 5, unitPrice: 120000 },
      { item: "Botellas Vidrio 1L (caja)", quantity: 10, unitPrice: 8000 },
    ],
    totalPaid: 680000, // 5*120000 + 10*8000 = 600000 + 80000 = 680000
    transactionDate: "2024-06-20",
  },
  {
    purchaseId: "PUR-004",
    supplier: "Químicos Industriales",
    itemDetails: [
      { item: "Ácido Láctico", quantity: 2, unitPrice: 25000 },
      { item: "Clarificante (L)", quantity: 5, unitPrice: 12000 },
    ],
    totalPaid: 110000, // 2*25000 + 5*12000 = 50000 + 60000 = 110000
    transactionDate: "2024-07-01",
  },
];

// Función para obtener todas las compras con filtros
export const getPurchases = async (filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula un retraso

  let filteredPurchases = [...mockPurchases]; // Copia para no modificar el original

  // Filtrar por rango de fechas
  if (filters.startDate) {
    const start = new Date(filters.startDate);
    filteredPurchases = filteredPurchases.filter(
      (purchase) => new Date(purchase.transactionDate) >= start
    );
  }
  if (filters.endDate) {
    const end = new Date(filters.endDate);
    filteredPurchases = filteredPurchases.filter(
      (purchase) => new Date(purchase.transactionDate) <= end
    );
  }

  // Filtrar por proveedor
  if (filters.supplier) {
    filteredPurchases = filteredPurchases.filter(
      (purchase) => purchase.supplier === filters.supplier
    );
  }

  return filteredPurchases;
};

// Mock de datos de ventas
const mockSales = [
  {
    saleId: "SAL-001",
    sellerId: "admin123", // ID del empleado que realizó la venta
    customerName: "Bar La Esquina",
    itemDetails: [
      { item: "Cerveza IPA 1L", quantity: 10, unitPrice: 3500 },
      { item: "Cerveza Stout 1L", quantity: 5, unitPrice: 3800 },
    ],
    totalAmount: 54000, // 10*3500 + 5*3800 = 35000 + 19000 = 54000
    saleDate: "2024-06-05",
    idEvento: "EVT-001", // Nuevo campo: ID del evento
  },
  {
    saleId: "SAL-002",
    sellerId: "vendedor123",
    customerName: "Restaurant El Sabor",
    itemDetails: [
      { item: "Barril Lager 50L", quantity: 1, unitPrice: 80000 },
      { item: "Cerveza Pilsner 1L", quantity: 20, unitPrice: 3000 },
    ],
    totalAmount: 140000, // 1*80000 + 20*3000 = 80000 + 60000 = 140000
    saleDate: "2024-06-10",
    idEvento: "EVT-002",
  },
  {
    saleId: "SAL-003",
    sellerId: "vendedor123",
    customerName: "Tienda de Barrio",
    itemDetails: [{ item: "Cerveza Amber 1L", quantity: 15, unitPrice: 3200 }],
    totalAmount: 48000, // 15*3200 = 48000
    saleDate: "2024-06-25",
    idEvento: "EVT-001", // Misma venta que SAL-001 para probar filtro por evento
  },
  {
    saleId: "SAL-004",
    sellerId: "admin123",
    customerName: "Distribuidora Grande",
    itemDetails: [
      { item: "Barril IPA 50L", quantity: 3, unitPrice: 85000 },
      { item: "Barril Stout 50L", quantity: 2, unitPrice: 90000 },
    ],
    totalAmount: 435000, // 3*85000 + 2*90000 = 255000 + 180000 = 435000
    saleDate: "2024-07-02",
    idEvento: "EVT-003",
  },
  {
    saleId: "SAL-005",
    sellerId: "superuser", // Venta realizada por el superuser
    customerName: "Cliente VIP",
    itemDetails: [
      { item: "Cerveza Especial 1L", quantity: 5, unitPrice: 5000 },
    ],
    totalAmount: 25000,
    saleDate: "2024-07-03",
    idEvento: "EVT-002", // Misma venta que SAL-002 para probar filtro por evento
  },
];

// Función para obtener ventas con filtros
export const getSales = async (filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula un retraso

  let filteredSales = [...mockSales]; // Copia para no modificar el original

  // Filtrar por ID de vendedor (si se proporciona y no es admin)
  if (filters.sellerId && !filters.isAdmin) {
    filteredSales = filteredSales.filter(
      (sale) => sale.sellerId === filters.sellerId
    );
  }

  // Filtrar por rango de fechas
  if (filters.startDate) {
    const start = new Date(filters.startDate);
    filteredSales = filteredSales.filter(
      (sale) => new Date(sale.saleDate) >= start
    );
  }
  if (filters.endDate) {
    const end = new Date(filters.endDate);
    filteredSales = filteredSales.filter(
      (sale) => new Date(sale.saleDate) <= end
    );
  }

  // Filtrar por ID de evento
  if (filters.idEvento) {
    filteredSales = filteredSales.filter(
      (sale) => sale.idEvento === filters.idEvento
    );
  }

  return filteredSales;
};

// Mock de datos de barriles
const mockBarrels = [
  {
    ID_barril: "BRL-001",
    Nombre: "Cerveza Lager",
    SaborPrincipal: "Malta Dulce",
    FechaElaboracion: "2024-05-10",
    Lote: "LOTE-LAGER-001",
    GradoAlcoholico: 5.0,
    CapacidadLitros: 50,
    isFull: true,
  },
  {
    ID_barril: "BRL-002",
    Nombre: "Cerveza IPA",
    SaborPrincipal: "Cítrico y Resinoso",
    FechaElaboracion: "2024-05-15",
    Lote: "LOTE-IPA-001",
    GradoAlcoholico: 6.5,
    CapacidadLitros: 50,
    isFull: true,
  },
  {
    ID_barril: "BRL-003",
    Nombre: "Cerveza Stout",
    SaborPrincipal: "Café y Chocolate",
    FechaElaboracion: "2024-05-20",
    Lote: "LOTE-STOUT-001",
    GradoAlcoholico: 7.0,
    CapacidadLitros: 30,
    isFull: false, // Este barril está parcialmente lleno
  },
  {
    ID_barril: "BRL-004",
    Nombre: "Cerveza Amber Ale",
    SaborPrincipal: "Caramelo y Tostado",
    FechaElaboracion: "2024-05-25",
    Lote: "LOTE-AMBER-001",
    GradoAlcoholico: 5.5,
    CapacidadLitros: 50,
    isFull: true,
  },
  {
    ID_barril: "BRL-005",
    Nombre: "Cerveza Pilsner",
    SaborPrincipal: "Lúpulo Floral",
    FechaElaboracion: "2024-06-01",
    Lote: "LOTE-PILSNER-001",
    GradoAlcoholico: 4.8,
    CapacidadLitros: 50,
    isFull: true,
  },
  {
    ID_barril: "BRL-006",
    // Modificado para tener el mismo Nombre y Lote que BRL-002 para demostrar la asociación
    Nombre: "Cerveza IPA",
    SaborPrincipal: "Frutal Intenso",
    FechaElaboracion: "2024-06-10",
    Lote: "LOTE-IPA-001", // Mismo lote que BRL-002
    GradoAlcoholico: 8.0,
    CapacidadLitros: 50,
    isFull: true,
  },
];

// Función para obtener todos los barriles
export const getBarrels = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula un retraso
  return mockBarrels;
};

// Función para obtener barriles por ID de Lote
export const getBarrelsByLoteId = async (loteId) => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula un retraso
  return mockBarrels.filter((barrel) => barrel.Lote === loteId);
};

// Mock de datos de lotes
const mockLots = [
  {
    loteId: "LOTE-LAGER-001",
    elaboratedBy: "Productor User (ID: productor123)",
    ingredients: {
      maltas: ["Malta Pilsner", "Malta Carapils"],
      lupulos: ["Hallertau", "Saaz"],
      levadura: "SafLager W-34/70",
      tipoFermentacion: "Baja (Lager)",
      tiempoFermentacion: "21 días",
      anadidosEspeciales: ["Clarificante"],
    },
    description:
      "Lote de cerveza Lager clásica con un perfil de malta suave y final limpio.",
  },
  {
    loteId: "LOTE-IPA-001",
    elaboratedBy: "Admin User (ID: admin123)",
    ingredients: {
      maltas: ["Malta Pale Ale", "Malta Munich"],
      lupulos: ["Cascade", "Citra", "Mosaic"],
      levadura: "SafAle US-05",
      tipoFermentacion: "Alta (Ale)",
      tiempoFermentacion: "14 días",
      anadidosEspeciales: ["Dry Hopping con Citra"],
    },
    description:
      "Lote de IPA con un fuerte aroma y sabor a lúpulo cítrico y tropical.",
  },
  {
    loteId: "LOTE-STOUT-001",
    elaboratedBy: "Productor User (ID: productor123)",
    ingredients: {
      maltas: ["Malta Roasted Barley", "Malta Chocolate", "Malta Pale Ale"],
      lupulos: ["Fuggles"],
      levadura: "SafAle S-04",
      tipoFermentacion: "Alta (Ale)",
      tiempoFermentacion: "18 días",
      anadidosEspeciales: ["Cacao Nibs"],
    },
    description:
      "Lote de Stout oscura con notas de café tostado y chocolate amargo.",
  },
  {
    loteId: "LOTE-AMBER-001",
    elaboratedBy: "Productor User (ID: productor123)",
    ingredients: {
      maltas: ["Malta Amber", "Malta Cristal"],
      lupulos: ["East Kent Goldings"],
      levadura: "Wyeast 1056",
      tipoFermentacion: "Alta (Ale)",
      tiempoFermentacion: "16 días",
      anadidosEspeciales: [],
    },
    description:
      "Lote de Amber Ale balanceada con dulzor a caramelo y un final seco.",
  },
  {
    loteId: "LOTE-PILSNER-001",
    elaboratedBy: "Productor User (ID: productor123)",
    ingredients: {
      maltas: ["Malta Pilsner"],
      lupulos: ["Saaz", "Tettnang"],
      levadura: "White Labs WLP830",
      tipoFermentacion: "Baja (Lager)",
      tiempoFermentacion: "25 días",
      anadidosEspeciales: [],
    },
    description:
      "Lote de Pilsner clásica, limpia y refrescante con un carácter floral.",
  },
];

// Función para obtener detalles de un lote por su ID
export const getLotDetails = async (loteId) => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula un retraso
  return mockLots.find((lot) => lot.loteId === loteId);
};

// Mock de datos de empleados para el filtro
const mockEmployees = [
  { id: "admin123", name: "Admin User", role: ROLES.ADMIN },
  { id: "vendedor123", name: "Vendedor User", role: ROLES.VENDEDOR },
  { id: "productor123", name: "Productor User", role: ROLES.PRODUCTOR },
  { id: "superuser", name: "Super User", role: ROLES.ADMIN },
];

// Función para obtener la lista de empleados
export const getEmployees = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simula un retraso
  return mockEmployees;
};

// Mock de proveedores para el filtro de compras
const mockSuppliers = [
  { id: "SUP-001", name: "Malta Premium S.A." },
  { id: "SUP-002", name: "Levaduras Express" },
  { id: "SUP-003", name: "Envases y Barriles Ltda." },
  { id: "SUP-004", name: "Químicos Industriales" },
];

// Función para obtener la lista de proveedores
export const getSuppliers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simula un retraso
  return mockSuppliers;
};

// Función para obtener el estado de las cervezas
export const getBeerStatus = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula un retraso

  const beerStatusMap = new Map();

  // Agrupar barriles por nombre de cerveza
  mockBarrels.forEach((barrel) => {
    const beerName = barrel.Nombre;
    if (!beerStatusMap.has(beerName)) {
      beerStatusMap.set(beerName, {
        name: beerName,
        totalCapacity: 0,
        currentVolume: 0,
        barrels: [],
        status: "Agotado", // Default to finished, update if any barrel is full or partially full
      });
    }

    const beerData = beerStatusMap.get(beerName);
    beerData.totalCapacity += barrel.CapacidadLitros;
    if (barrel.isFull) {
      beerData.currentVolume += barrel.CapacidadLitros;
    } else if (barrel.isFull === false) {
      // Assuming false means partially full or empty but still in inventory
      // For simplicity, if not full, assume 0 for current volume for status calculation
      // In a real app, you'd have a 'currentVolume' field per barrel
    }
    beerData.barrels.push({
      ID_barril: barrel.ID_barril,
      Lote: barrel.Lote,
      CapacidadLitros: barrel.CapacidadLitros,
      isFull: barrel.isFull,
    });
  });

  // Determinar el estado general de cada cerveza
  beerStatusMap.forEach((beerData) => {
    // Check if any barrel is full or if total capacity is greater than 0
    const hasFullBarrels = beerData.barrels.some((b) => b.isFull);
    const hasAnyBarrels = beerData.barrels.length > 0;

    if (hasFullBarrels) {
      beerData.status = "Disponible";
    } else if (hasAnyBarrels && !hasFullBarrels) {
      // If there are barrels but none are full, consider it partially available or low stock
      // For this mock, we'll simplify: if any barrel exists, it's 'Disponible', otherwise 'Agotado'
      // A more complex logic would involve actual current volume vs total capacity
      beerData.status = "Bajo Stock / Parcialmente Disponible";
    } else {
      beerData.status = "Agotado";
    }
  });

  return Array.from(beerStatusMap.values());
};
