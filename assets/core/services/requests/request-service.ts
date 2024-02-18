import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import requestInterceptor from './interceptor/request-interceptor';
import responseInterceptor from './interceptor/reponse-interceptor';

export default class RequestService {
    static instance: RequestService;
    baseURL: string;
    interceptorId: number | null;

    public constructor() {
        this.baseURL = process.env.API_URL;
        this.initBaseUrl();
        this.interceptorId = requestInterceptor(axios);
        responseInterceptor(axios);
    }

    /**
     * Get instance of RequestService
     * @return {RequestService}
     */
    public static getInstance(): RequestService {
        if (!RequestService.instance) {
            RequestService.instance = new RequestService();
        }
        return RequestService.instance;
    }

    /**
     * Defined base url for all request
     */
    private initBaseUrl(): void {
        axios.defaults.baseURL = this.baseURL;
    }

    /**
     * Remove the request interceptor
     */
    public ejectInterceptor(): void {
        if (this.interceptorId !== null) {
            axios.interceptors.request.eject(this.interceptorId);
        }
    }

    /**
     * Get request method
     * @param {string} url 
     * @returns {Promise<AxiosResponse<T>>}
     */
    async get<T>(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<T>> {
        return axios.get<T>(url, config).then(<T>(response: AxiosResponse<T>) => response);
    }

    /**
     * Post request method
     * @param {string} url 
     * @param {DT} body
     * @returns {Promise<AxiosResponse<T>>} 
     */
    async post<T, DT>(url: string, body?: DT, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<T>> {
        return axios.post<T>(url, body, config).then(<T>(response: AxiosResponse<T>) => response);
    }

    /**
     * Put request method
     * @param {string} url 
     * @param {DT} body
     * @returns {Promise<AxiosResponse<T>>} 
     */
    async put<T, DT>(url: string, body?: DT, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<T>> {
        return axios.put<T>(url, body, config).then(<T>(response: AxiosResponse<T>) => response);
    }

    /**
     * Delete request method
     * @param {string} url
     * @returns {Promise<AxiosResponse<T>>} 
     */
    async delete<T>(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<T>> {
        return axios.delete<T>(url, config).then(<T>(response: AxiosResponse<T>) => response);
    }
}
