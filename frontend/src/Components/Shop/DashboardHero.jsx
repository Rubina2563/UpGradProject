import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  const availableBalance = seller?.availableBalance?.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "actions",
      flex: 1,
      minWidth: 150,
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/dashboard-order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows = orders?.map((order) => {
    const { totalQuantity, totalPrice } = order.cart
      .filter((cartItem) => cartItem.product.shopId === seller._id)
      .reduce(
        (acc, cartItem) => {
          acc.totalQuantity += cartItem.quantity;
          acc.totalPrice += cartItem.product.discountPrice * cartItem.quantity;
          return acc;
        },
        { totalQuantity: 0, totalPrice: 0 }
      );

    return {
      id: order._id,
      itemsQty: totalQuantity,
      total: `Rs ${totalPrice.toFixed(2)}`,
      status: order.status,
    };
  });

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full block md:flex items-center justify-between">
        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-[#fde7e7] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#00000085" />
            <h3 className="font-Roboto text-[#333] text-[18px] leading-5 font-semibold text-[#00000085]">
              Account Balance{" "}
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">Rs {availableBalance}</h5>
          <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#d93788] font-semibold">Withdraw Money</h5>
          </Link>
        </div>

        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-[#fde7e7] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3 className="font-Roboto text-[#333] text-[18px] leading-5 font-semibold text-[#00000085]">
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{orders?.length}</h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#d93788] font-semibold">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 md:w-[30%] min-h-[20vh] bg-[#fde7e7] shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect size={30} className="mr-2" fill="#00000085" />
            <h3 className="font-Roboto text-[#333] text-[18px] leading-5 font-semibold text-[#00000085]">
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{products?.length}</h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#d93788] font-semibold">View Products</h5>
          </Link>
        </div>
      </div>

      <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
      <div className="w-full min-h-[45vh] bg-[#fde7e7] rounded">
        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
      </div>
    </div>
  );
};

export default DashboardHero;