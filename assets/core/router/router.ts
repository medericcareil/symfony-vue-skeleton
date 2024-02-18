import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';
import { routes } from '@/routes';
import addMetaToDOM from './config/add-meta';
import { Middleware, MiddlewareContext } from '../middleware/middleware-type';

const router: Router = createRouter({
    history: createWebHistory('/'),
    routes,
    scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalized, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    addMetaToDOM(to, from, next);

    if (!to.meta.middleware) {
        return next();
    } else {
        const middleware: Middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
        const context: MiddlewareContext = {to, from, next};

        for (const fn of middleware) {
            fn({...context});
        }
    }
});

export default router;
