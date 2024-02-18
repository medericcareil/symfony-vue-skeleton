import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export type MiddlewareContext = {
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
}

export type Middleware = { (context: MiddlewareContext): void; }[];
