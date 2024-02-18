import { RolesEnum } from "@/core/enums/roles-enum";
import { User } from "@/core/models/user";
import guard from "./guard";
import { MiddlewareContext } from "../middleware-type";

/**
 * Default function to check if user is logged
 * @param {MiddlewareContext} context 
 * @returns {void}
 */
export default async function authGuard(context: MiddlewareContext): Promise<void> {
    const user: User = await guard(context) as User;

    if (!user.roles.includes(RolesEnum.User)) {
        // Some logic here
        console.log('CANT ACCESS !')
    }

    return context.next();
}
