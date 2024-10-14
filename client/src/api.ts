import axios from 'axios';
import getEnvVariables from "./etc/loadVariables.ts";

const envVariables = getEnvVariables();
const { backendURL } = envVariables;

/**
 * creates an api element for axios. added withCredentials for jwt use
 */
const api = axios.create({
    baseURL: backendURL,
    withCredentials: true
});

export default api;