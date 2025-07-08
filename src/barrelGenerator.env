import { createClient } from '@supabase/supabase-js';
// Configura tus credenciales de Supabase
const supabaseUrl = 'https://qxrlnxuihnkxiceinalf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cmxueHVpaG5reGljZWluYWxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NTY1MzMsImV4cCI6MjA2NzMzMjUzM30.gdVqVIDGeaAU3k90wL05J2n5qjO1WslYgRpDZEnAc5Q';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
/**
 * Genera un nuevo barril y lo guarda en la tabla 'barriles' de Supabase.
 * @param {object} barrelData - Los datos del barril a crear.
 * @param {number} barrelData.capacidad - La capacidad del barril.
 * @param {boolean} barrelData.esta_lleno_barril - Indica si el barril está lleno.
 * @param {string} barrelData.id_cerveza - El UUID de la cerveza asociada al barril.
 * @returns {Promise<object>} Un objeto con el barril creado o un error.
 */
export async function generarYGuardarBarril(barrelData) {
  try {
    // El id_barril es un UUID generado automáticamente por la base de datos (DEFAULT uuid_generate_v4()),
    // por lo que no necesitamos pasarlo en el objeto barrelData para la inserción.
    // Supabase lo manejará automáticamente.
    const { data, error } = await supabase
      .from('barril') // Asegúrate de que 'barriles' sea el nombre exacto de tu tabla
      .insert([barrelData])
      .select(); // Para devolver el barril insertado, incluyendo el id_barril generado
    if (error) {
      console.error('Error al insertar el barril:', error);
      return { data: null, error };
    }
    console.log('Barril generado y guardado exitosamente:', data);
    return { data: data[0], error: null }; // data es un array, tomamos el primer elemento
  } catch (err) {
    console.error('Error inesperado en generarYGuardarBarril:', err);
    return { data: null, error: err.message };
  }
}
/*
(async () => {
  // Necesitarás un UUID válido para id_cerveza.
  // Puedes generarlo en línea o usar una librería como 'uuid'.
  // Por ejemplo, si usas 'uuid': npm install uuid
  // import { v4 as uuidv4 } from 'uuid';
  // const idCervezaEjemplo = uuidv4();
  const nuevoBarril = {
    capacidad: 50, // Capacidad en INT
    esta_lleno_barril: true, // Booleano
  };
  const resultado = await generarYGuardarBarril(nuevoBarril);
  if (resultado.data) {
    console.log('Barril creado:', resultado.data);
    // resultado.data ahora contendrá el id_barril generado por Supabase
    console.log('ID del barril generado:', resultado.data.id_barril);
  } else {
    console.error('Fallo al crear el barril:', resultado.error);
  }

  const otroBarril = {
    capacidad: 20,
    esta_lleno_barril: false,
  };
  const resultado2 = await generarYGuardarBarril(otroBarril);
  if (resultado2.data) {
    console.log('Otro barril creado:', resultado2.data);
  } else {
    console.error('Fallo al crear el otro barril:', resultado2.error);
  }
})(); */