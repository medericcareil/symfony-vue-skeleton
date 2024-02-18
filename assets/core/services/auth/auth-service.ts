import { LoginFormDto } from "@/core/dtos/login-form-dto";
import { TokenDto } from "@/core/dtos/token-dto";
import router from "@/core/router/router";
import RequestService from "../requests/request-service";
import { store } from '@/core/store/store';
import { User } from "@/core/models/user";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";

class AuthService {
    /**
     * Login method
     * @param {LoginFormDto} loginForm 
     */
    async login(loginForm: LoginFormDto): Promise<void|string> {    
        const request = new RequestService();  
        return request.post<TokenDto, LoginFormDto>('/auth/signin', loginForm).then((response: AxiosResponse<TokenDto>) => {
            localStorage.setItem('token', response.data.token);
            router.push({name: 'home'});
        }).catch((error: AxiosError) => {
            return this.errorLoginResponse(error.response.status);
        });
    }

    /**
     * Logout method
     */
    logout(): void {
        localStorage.removeItem('token');
        store.commit('removeUser');
        router.push({name: 'login'});
    }

    /**
     * Fetch current user connected
     * @returns {Promise<User>}
     */
    async getCurrentUser(): Promise<User> {
        const request = RequestService.getInstance();
        return request.get<User>('/auth/get-user').then((response: AxiosResponse<User>) => {
            const user: User = response.data;
            store.commit('addUser', { user });
            return user;
        }).catch((error: AxiosError) => { throw new Error('Une erreur est survenue lors de la récupération de l\'utilisateur'); });
    }

    /**
     * Return error message for login
     * @param {number} httpStatusCode 
     * @returns {string}
     */
    private errorLoginResponse(httpStatusCode: number): string {
        switch (httpStatusCode) {
            case HttpStatusCode.Unauthorized:
                return 'L\'identifiant et/ou le mot de passe sont incorrect';
            default:
                return 'Une erreur est survenue veuillez réessayer dans quelques instants';
        } 
    }
}

export const authService = new AuthService();
