import { NavigationGuardNext, RouteLocationNormalized, RouteRecordNormalized } from "vue-router";

/**
 * Add title and meta from routes file, to the DOM
 * @param {RouteLocationNormalized} to 
 * @param {RouteLocationNormalized} from 
 * @param {NavigationGuardNext} next 
 * @returns {void}
 */
export default function addMetaToDOM(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    const appName: string = process.env.APP_NAME;
    const prefixTitle: boolean = JSON.parse(process.env.PREFIX_TITLE);

    const nearestWithTitle: RouteRecordNormalized | undefined = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithMeta: RouteRecordNormalized | undefined = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta: RouteRecordNormalized | undefined = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    if (nearestWithTitle !== undefined) {
        document.title = typeof nearestWithTitle.meta.title === 'string' ? 
            prefixTitle ? 
                appName + ' - ' + nearestWithTitle.meta.title :
                nearestWithTitle.meta.title : 
            '';
    
    } else if (previousNearestWithMeta) {
        document.title = typeof previousNearestWithMeta.meta.title === 'string' ? 
            prefixTitle ?
                appName + ' - ' + previousNearestWithMeta.meta.title : 
                previousNearestWithMeta.meta.title :     
            '';
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode!.removeChild(el));

    if (nearestWithMeta && Array.isArray(nearestWithMeta.meta.metaTags)) {
        nearestWithMeta.meta.metaTags.map((tagDef: { [x: string]: string; }) => {
            const tag: HTMLMetaElement = <HTMLMetaElement>document.createElement('meta');

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });

            tag.setAttribute('data-vue-router-controlled', '');

            return tag;
        })
            .forEach((tag: HTMLMetaElement) => document.head.appendChild(tag));
    }
}
