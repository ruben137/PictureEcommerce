import React from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import ProductsTable from '../../components/ProductsTable'
import './styles.css'

const AdminPage = () => {
  return (
    <div className="admin-container" >
       <AdminSidebar/>
       <ProductsTable/>
    </div>
  )
}

export default AdminPage
