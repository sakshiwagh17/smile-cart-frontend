import { useEffect, useState } from "react";

import productapi from "apis/product";
import { Header } from "components/commons";
import { Spinner, Typography } from "neetoui";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { products } = await productapi.fetch();
      console.log("API Response:", products);
      setProducts(products);
    } catch (error) {
      console.error("An error occurred while fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  <Header shouldShowBackButton={false} title="Smile Cart" />;

  return (
    <>
      <Header title={name} />
      <div className="flex flex-col">
        <div className="m-2">
          <Typography className="mx-6 mb-2 mt-6" fontWeight="600" variant="h1">
            Smile Cart
          </Typography>
          <hr className="neeto-ui-bg-black h-1" />
        </div>
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
