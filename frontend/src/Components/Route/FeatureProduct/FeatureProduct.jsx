import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div>
      <div className={`w-11/12 mx-auto`}>
        <div className={`text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts && allProducts.length !== 0 && (
            <>
              {allProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  data={product}
                  
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;