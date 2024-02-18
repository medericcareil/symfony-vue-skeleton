import { User } from "@/core/models/user";
import { RolesEnum } from "@/core/enums/roles-enum";
import guard from "./guard";
import { authService } from "@/core/services/auth/auth-service";
import { MiddlewareContext } from "../middleware-type";

/**
 * Default function to check if user is logged as Admin role
 * @param {MiddlewareContext} context 
 */
export default async function adminGuard(context: MiddlewareContext): Promise<void> {
    const user: User = await guard(context) as User;

    if (!user.roles.includes(RolesEnum.SuperAdmin)) {
        authService.logout();
    }

    return context.next();
}
