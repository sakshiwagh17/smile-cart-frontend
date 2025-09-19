import { useEffect, useState } from "react";

import axios from "axios";
import { Spinner } from "neetoui";
import { append, isNotNil } from "ramda";

import Carousel from "./Carousel";

// import { IMAGE_URLS } from "./constants";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
      );
      setProduct(res.data);
      console.log("Api Response", res);
    } catch (error) {
      console.log("An error occured", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { name, description, mrp, offer_price, image_url, image_urls } =
    product;
  const totalDiscounts = mrp - offer_price;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);
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

  return (
    <div className="px-6 pb-6">
      <div>
        <p className="py-2 text-4xl font-semibold">{name}</p>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {isNotNil(image_urls) ? (
            <Carousel imageUrls={append(image_url, image_urls)} title={name} />
          ) : (
            <img alt={name} className="w-48" src={image_url} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <p>{description}</p>
          <p>MRP: {mrp}</p>
          <p className="font-semibold">Offer price: {offer_price}</p>
          <p className="font-semibold text-green-600">
            {discountPercentage}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
