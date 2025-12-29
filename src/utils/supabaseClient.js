//Creacion del cliente para supabase

//Importacion del soporte para urls
import "react-native-url-polyfill/auto";
//Importacion de la funcion oficial para crear un cliente supabase
import { createClient } from "@supabase/supabase-js"

//Variables de entorno privadas en .dev para la url de la base de datos y la API key
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

//Se inicializa el cliente supabase con configuracion de autenticacion y se exporta para poder usarlo
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        //Guarda la sesion en el dispositivo para que no se pierda al cerrar la app
        persistSession: true,
        //Renueva el token cuando se expira
        autoRefreshToken: true,
        //Desactiva la deteccion de sesion en la url (Aunque mas util en sitios web)
        detectSessionInUrl: false
    }
})