import { AxiosStatic } from "axios";

/**
 * Intercept all request and add bearer token to header if he exists
 */
export default function requestInterceptor(axios: AxiosStatic): number {
    return axios.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers["Content-Type"] = 'application/json';
        }
        return config;
    });
}
