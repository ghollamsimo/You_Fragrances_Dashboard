import axios from "axios";
import {config} from "../helpers/ConfigHelper.ts";

const Api = () => {
    const token = localStorage.getItem("token");
    return axios.create(config(token));
}

export default Api