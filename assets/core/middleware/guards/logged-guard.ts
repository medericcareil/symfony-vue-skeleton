import { MiddlewareContext } from "../middleware-type";

/**
 * Check if logged user move to login page
 * @param {MiddlewareContext} context 
 * @returns {void}
 */
export default function loggedGuard(context: MiddlewareContext): void {
    if (localStorage.getItem('token')) {
        return context.next({ name: 'home' });
    }

    return context.next();
}
