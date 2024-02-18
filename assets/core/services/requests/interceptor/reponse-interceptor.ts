import { AxiosErrorResponse } from "@/core/errors/axios-error-response";
import { authService } from "@/core/services/auth/auth-service";
import { AxiosError, AxiosResponse, AxiosStatic, HttpStatusCode } from "axios";

/**
 * Intercept all axios response
 * Logout user if token is expired 
 */
export default function responseInterceptor(axios: AxiosStatic): void {
    axios.interceptors.response.use(
        (res: AxiosResponse<any, any>) => res,
        (error: AxiosError) => {
            const { data, status, config } = error.response!;
            switch (status) {
                case HttpStatusCode.BadRequest:
                    console.error('bad-request');
                    break;
                case HttpStatusCode.Unauthorized:
                    const err = data as AxiosErrorResponse;
                    if (err.message === 'Expired JWT Token') {
                        authService.logout();
                    }
                    console.error('unauthorised');
                    break;

                case HttpStatusCode.NotFound:
                    console.error('not-found');
                    break;

                case HttpStatusCode.InternalServerError:
                    console.error('server-error');
                    break;
            }
            return Promise.reject(error);
        }
    );
}
