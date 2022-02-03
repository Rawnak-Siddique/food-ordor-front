import axios from "axios";

export default axios.create({
    baseURL: "https://hungry-boy-server.herokuapp.com/api",
});