// hooks/useAuth.js capa de autenticacion reutilizable o control central (fuera de las screens)
import { useState, useEffect } from 'react'
//Se exporta el cliente de supabase
import { supabase } from '../utils/supabaseClient'

//Verificacion
export function useAuth() {
    //Guarda la informacion del usuario logueado o null si no la hay
  const [session, setSession] = useState(null)
    //Indica si todavia se esta verificando la sesion inicial
  const [loading, setLoading] = useState(true)

  //Escucha cambios de sesión. Pregunta a supabase si ya habia una sesion guardada
  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])
  //-----------------------------------------------------------------

  // Funciones de autenticación
  const signUp = async (email, password) => { //Crea un nuevo usuario en supabase
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  const signIn = async (email, password) => { //Inicia sesion con email
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signOut = async () => { //Cierra sesion
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  //Entrega todo lo que se necesita para manejar la autenticacion en los componentes
  return {
    session,
    loading,
    signUp,
    signIn,
    signOut
  }
}