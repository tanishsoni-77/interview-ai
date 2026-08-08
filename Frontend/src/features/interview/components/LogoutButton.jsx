import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { LogOut } from 'lucide-react'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get('https://interview-ai-nanp.onrender.com/api/auth/logout', {
        withCredentials: true,
      })
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <button type="button" className="logout-button" onClick={handleLogout}>
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  )
}

export default LogoutButton
