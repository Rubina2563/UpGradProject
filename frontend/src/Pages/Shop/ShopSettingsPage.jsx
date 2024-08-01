//corrected
import React from "react";
import ShopSettings from "../../Components/Shop/ShopSettings";
import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
      
        <ShopSettings />
         <div className="w-[80px] md:w-[330px]">
          <DashboardSideBar active={11} />
        </div>
      </div>
    </div>
  );
};

export default ShopSettingsPage;