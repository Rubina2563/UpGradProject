import React from "react";
//import { useSelector } from "react-redux";
import { productData } from "../../../Static/data";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  // const {allProducts} = useSelector((state) => state.products);
   
  return (
    <div>
      <div className="p-4 md:p-8 lg:p-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
          {/*
            allProducts && allProducts.length !== 0 &&(
              <>
               {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           */}
          {productData && productData.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;