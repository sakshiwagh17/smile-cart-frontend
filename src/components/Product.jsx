import { useEffect, useState } from "react";

import productapi from "apis/product";
import { Spinner } from "neetoui";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    mrp: 0,
    offerPrice: 0,
    imageUrls: [],
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await productapi.show();
      console.log("API Response:", res);

      // Always fallback to a safe object
      setProduct(
        res?.data || {
          name: "",
          description: "",
          mrp: 0,
          offerPrice: 0,
          imageUrls: [],
          imageUrl: "",
        }
      );
    } catch (error) {
      console.log("An error occurred:", error);
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

  // Safe destructuring
  const { name, description, mrp, offerPrice, imageUrls, imageUrl } =
    product || {};

  // Safe discount calculation
  const totalDiscounts = mrp && offerPrice ? mrp - offerPrice : 0;
  const discountPercentage =
    mrp > 0 ? ((totalDiscounts / mrp) * 100).toFixed(1) : 0;

  // Safe image handling
  const images = imageUrls?.length > 0 ? [imageUrl, ...imageUrls] : [imageUrl];

  return (
    <div className="px-6 pb-6">
      <div>
        <p className="py-2 text-4xl font-semibold">{name}</p>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {images?.length > 1 ? (
            <Carousel imageUrls={images} title={name} />
          ) : (
            <img
              alt={name}
              className="w-48"
              src={imageUrl || "/assets/default-product.png"}
            />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <p>{description}</p>
          <p>MRP: {mrp}</p>
          <p className="font-semibold">Offer price: {offerPrice}</p>
          <p className="font-semibold text-green-600">
            {discountPercentage}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
