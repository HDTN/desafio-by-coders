import React, { useEffect } from 'react'
import { useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/auth'
const StateContext = createContext()

const UserContext = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {})
  const navigate = useNavigate()
  
  useEffect(() => {
    if(user && Object.keys(user).length > 0){
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  const logout = () => {
    localStorage.clear()
    setUser({})
    navigate('/login')
    AuthService.logout()
  }

  return <>
    <StateContext.Provider value={{ user, setUser, logout }}>
      {children}
    </StateContext.Provider>
  </>
}

const useUserContext = () => useContext(StateContext)

export {
  UserContext,
  useUserContext,
}
