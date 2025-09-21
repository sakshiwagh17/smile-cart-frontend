import axios from "axios";

const show = slug => axios.get(`products/${slug}`);
const fetch = () => axios.get("products");

const productapi = { show, fetch };
export default productapi;
