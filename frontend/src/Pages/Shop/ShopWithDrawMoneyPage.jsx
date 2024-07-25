//CORRECTED
import React from 'react'
import DashboardHeader from '../../Components/Shop/Layout/DashboardHeader'
import WithdrawMoney from "../../Components/Shop/WithdrawMoney";
import DashboardSideBar from '../../Components/Shop/Layout/DashboardSideBar';

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] md::w-[330px]">
        <DashboardSideBar active={7} />
      </div>
       <WithdrawMoney />
    </div>
  </div>
  )
}

export default ShopWithDrawMoneyPage