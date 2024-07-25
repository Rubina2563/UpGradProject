//corrected
import React from 'react'
import AdminHeader from '../Components/Layout/AdminHeader'
import AdminSideBar from '../Components/Admin/Layout/AdminSideBar'
import AllWithdraw from "../Components/Admin/AllWithdraw";

const AdminDashboardWithdraw = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={7} />
        </div>
         <AllWithdraw />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardWithdraw