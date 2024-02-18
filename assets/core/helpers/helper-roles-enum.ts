import { RolesEnum } from "../enums/roles-enum";

export default class HelperRolesEnum {

    /**
     * Helper to convert RolesEnum to french string
     * @param {RolesEnum} role 
     * @returns {string}
     */
    static frenchStringify(role: RolesEnum): string {
        switch (role) {
            case RolesEnum.User:
                return 'Utilisateur';
            case RolesEnum.Admin:
                return 'Administrateur';
            case RolesEnum.SuperAdmin:
                return 'Super Administrateur';
            default:
                throw new Error('Le rôle n\'existe pas');
        }
    }
}
