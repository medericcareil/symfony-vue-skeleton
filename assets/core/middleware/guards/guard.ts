import { store } from "@/core/store/store";
import { authService } from "@/core/services/auth/auth-service";
import { toRaw } from "vue";
import { User } from "@/core/models/user";
import { MiddlewareContext } from "../middleware-type";

/**
 * Check if user token is valid
 * @param {MiddlewareContext} context 
 * @returns {Promise<void|User>}
 */
export default async function guard(context: MiddlewareContext): Promise<void|User> {
    if (!localStorage.getItem('token')) {
        return context.next({ name: 'login' });
    }

    let user: User = null;

    if (!store.getters.getCurrentUser) {
        user = await authService.getCurrentUser();
    } else {
        user = toRaw(store.getters.getCurrentUser);
    }

    return user;
}
