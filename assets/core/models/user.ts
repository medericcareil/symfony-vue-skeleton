import { RolesEnum } from "../enums/roles-enum";

export interface User {
    id: string;
    email: string;
    roles: RolesEnum[];
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    picture: string|null;
    createdAt: Date;
    updatedAt: Date|null;
}
