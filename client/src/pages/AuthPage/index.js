import React, { useEffect } from 'react'
import Auth from '../../components/Auth'
import { useHistory } from 'react-router'

const AuthPage = () => {
  const history=useHistory()
    const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
if(user)history.push('/')
  }, [history,user])
  return (
    <div style={{height:'calc(100vh - 56px)',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Auth/>
    </div>
  )
}

export default AuthPage
