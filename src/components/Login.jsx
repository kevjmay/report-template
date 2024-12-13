import React from 'react'
import { signInWithGitHub } from '../services/supabaseClient'
import { supabase } from '../services/supabaseClient'

const Login = () => {
  return (
    <div>
        <h1>Login</h1>
        <button onClick={signInWithGitHub}>Login with GitHub</button>
    </div>
  )
}

export default Login