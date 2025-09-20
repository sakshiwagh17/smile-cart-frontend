import axios from "axios";

const show = () => axios.get("products/infinix-inbook-2");

const productapi = { show };
export default productapi;
