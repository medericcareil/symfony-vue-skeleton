import { RouteRecordRaw } from "vue-router";
import Home from '@/views/Home.vue';
import Page from '@/views/Page.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';
import authGuard from "@/core/middleware/guards/auth-guard";
import loggedGuard from "./core/middleware/guards/logged-guard";
import adminGuard from "./core/middleware/guards/admin-guard";
import exempleGuard from "./core/middleware/guards/exemple-guard";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Accueil',
            middleware: authGuard,
            metaTags: [
                {
                    name: 'Home page',
                    content: 'The about page of our example app.',
                },
                {
                    name: 'description',
                    content: 'Skeleton home page.',
                },
                {
                    name: 'author',
                    content: 'Médéric CAREIL'
                }
            ]
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login',
            middleware: loggedGuard
        }
    },
    {
        path: '/page',
        name: 'page',
        component: Page,
        meta: {
            title: 'Page',
            middleware: [exempleGuard, adminGuard],
            metaTags: [
                {
                    name: 'Some meta name',
                    content: 'Some content to describe this meta'
                }
            ]
        }
    },
    {
        path: '/:pathMatch(.*)', 
        name: 'not-found', 
        component: NotFound,
        meta: {
            title: 'Page inexistante',
            middleware: authGuard
        }
    }
];
