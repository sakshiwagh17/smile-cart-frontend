import axios from "axios";

const show = () =>
  axios.get(
    "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
  );

const productapi = { show };
export default productapi;
