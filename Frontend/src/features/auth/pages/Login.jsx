import React,{useState } from 'react'
import "../auth.form.scss"
import { useNavigate,Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
const{loading,handleLogin} = useAuth()
const navigate = useNavigate()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const handleSubmit = async (e) =>{
  e.preventDefault()
 await  handleLogin({email,password})
 navigate('/')
}
if(loading){
  return (<main className="auth-shell"><div className="auth-loading"><div className="auth-loading__spinner" /><h1>Loading...</h1></div></main>)
}

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__glow" />
        <div className="auth-card__content">
          <div className="auth-brand">
            <div className="auth-brand__mark">AI</div>
            <div>
              <h1>Interview AI</h1>
              <p>Prepare smarter. Crack interviews with AI.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-field">
                <span className="input-field__icon">✉</span>
                <input 
                  onChange={(e)=> {setEmail(e.target.value)}}
                  type="email"
                  id="email"
                  placeholder='Enter email address'
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-field">
                <span className="input-field__icon">●</span>
                <input 
                  onChange={(e)=> {setPassword(e.target.value)}}
                  type="password" 
                  id="password" 
                  placeholder='Enter your password'
                />
              </div>
            </div>

            <button className='button primary-button'>Login</button>
          </form>

          <p className="auth-switcher">
            Don&apos;t have an account? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login