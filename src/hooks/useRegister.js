// hooks/useRegister.js hook personalizado para el registro, separando la logica de la UI
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export function useRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const registerUser = async ({ name, surname, age, email, password }) => {
    setLoading(true)
    setError(null)

    try {
      // 1. Crear usuario en Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      })

      if (authError) throw authError
      const user = authData.user

      // 2. Insertar perfil en tabla "usuarios"
      const { error: profileError } = await supabase
        .from('usuarios')
        .insert([
          {
            auth_id: user.id,   // clave primaria vinculada al usuario
            name,
            surname,
            age,
            email,
            password
          }
        ])

      if (profileError) throw profileError

      return user
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    registerUser,
    loading,
    error
  }
}