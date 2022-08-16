import { Role } from "../role.enum";

export class CreateUserDto{
    login: string;
    password: string;
    firstName: string;
    secondName: string;
    lastName: string;
    phone: string;
    position: string;
    role:Role;
}