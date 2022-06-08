import axios from "axios";
/*create an instance of axios with a default base URI when sending HTTP
requests*/
/*JSON Server has CORS Policy by default*/
const api = axios.create({ baseURL: "http://localhost:8000/api" });
export default api;
export const EndPoints = { time: "/v1/times", products: "/v1/products" };
