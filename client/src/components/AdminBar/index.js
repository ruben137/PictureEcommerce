import React from 'react'
import './styles.css'
import { useHistory } from 'react-router'
const AdminBar = () => {
  const history=useHistory()
  return (
    <div className="bg-light py-1" style={{display:'flex',justifyContent:'flex-end'}} >
     <span onClick={() => history.push("/admin")} className="admin-btn px-1 mr-3">Admin</span>
    </div>

  )
}

export default AdminBar
