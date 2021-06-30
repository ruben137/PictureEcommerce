import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import AuthContext from '../../contexts/Auth/AuthContext'

import './styles.css'

const Home = () => {
  const history = useHistory()
  const userData=JSON.parse(localStorage.getItem("profile"))
  const [user, setUser] = useState(null)
  const {authData}=useContext(AuthContext)
  useEffect(() => {
    setUser(authData||userData)
    }, [userData?.result?.userName])
    

  return (
    <>
      <div 
      style={{height:!user?.result?.isAdmin?"calc(100vh - 58.5px)":"calc(100vh - 58.5px - 32px)"}}
      className="w-100 cover d-flex justify-content-center align-items-center">
        <div>
          <h1 className="text-light text-center"  id="title" >
             Welcome to <span style={{color:"#00a8ff"}}>Pic</span>Commerce
          </h1>
          <button
            onClick={() => history.push('/products')}
            className="btn bg-primary text-light text-center mx-auto d-block"
          >Start shopping</button>
        </div>
      </div>
    </>
  )
}


export default Home
