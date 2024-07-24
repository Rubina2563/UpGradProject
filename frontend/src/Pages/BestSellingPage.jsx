import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import { useSearchParams } from "react-router-dom";
import Header from "../Components/Layout/Header";
import Loader from "../Components/Layout/Loader";
import ProductCard from "../Components/Route/ProductCard/ProductCard";
import Footer from "../Components/Layout/Footer";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out); 
    setData(sortedData);
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header heading={2} />
          <br />
          <br />
          <div className="w-11/12 mx-auto">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-8 mb-12">
              {data && data.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;