# Sistema de Gestión de Cervecería

Este proyecto es una base de datos robusta en el backend, y una pagina web para visualizar los datos de una tienda cervecera. El backend fue desarrollado en Supabase, mientras que el forntend fue desarrollado con React y Tailwind CSS. La pagina web permite a los usuarios con diferentes roles (Administrador, Vendedor, Productor) acceder a funcionalidades específicas, incluyendo la gestión de compras, ventas, barriles, lotes y el estado general de la cerveza.

## Características

* **Autenticación por Roles**: Sistema de inicio de sesión con RUT e ID de empleado. Los usuarios pueden tener uno o múltiples roles (Administrador, Vendedor, Productor).

* **Dashboard Dinámico**: La página principal muestra opciones de navegación condicionalmente, basándose en los roles del usuario autenticado.

* **Gestión de Compras**:

    * Visualización de un listado de compras realizadas por la empresa.

    * Generación de informes de compras con filtros por rango de fechas y proveedor (solo para administradores).

* **Gestión de Ventas**:

    * Visualización de ventas realizadas. Los vendedores solo pueden ver sus propias ventas, mientras que los administradores pueden ver todas las ventas.

    * Generación de informes de ventas con filtros por rango de fechas, ID de evento y empleado (para administradores) o solo por ventas propias (para vendedores).

* **Gestión de Barriles**:

    * Visualización de un listado de barriles con detalles como nombre de la cerveza, lote, fecha de elaboración, grado alcohólico, capacidad y estado (lleno/parcial).

    * Funcionalidad de búsqueda simple por nombre de cerveza, lote o fecha de elaboración.

    * Panel de detalles al seleccionar un barril.

    * Acceso a la información detallada del lote asociado al barril.

    * Opción para agregar nuevos barriles (temporalmente en el mock).

* **Gestión de Lotes**:

    * Página dedicada para ver los detalles de un lote específico, incluyendo ingredientes (maltas, lúpulos, levadura, tipo y tiempo de fermentación, añadidos especiales).

    * Sección de trazabilidad que indica quién elaboró el lote.

    * Listado de todos los barriles asociados a ese lote.

* **Estado de Cerveza**:

    * Tabla que resume el estado de cada tipo de cerveza (Disponible, Bajo Stock/Parcialmente Disponible, Agotado).

    * Indica los barriles específicos en los que se encuentra cada tipo de cerveza, con la capacidad y el estado de llenado.

    * Los IDs de barril son clickeables y redirigen a la página de gestión de barriles.

## Tecnologías Utilizadas

* **React**: Biblioteca de JavaScript para construir interfaces de usuario.

* **Tailwind CSS**: Framework CSS para un diseño rápido y responsivo.

* **React Router DOM**: Para el enrutamiento de la aplicación.

* **JavaScript (ES6+)**: Para la lógica del lado del cliente.

* **SupaBase**: Como base de datos PostgreSQL en la nube