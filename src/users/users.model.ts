import { type } from 'os';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
    login: string;
    password: string;
    firstName: string;
    secondName: string;
    lastName: string;
    phone: string;
    position: string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})    
    id:number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login:string;

    @Column({type: DataType.STRING, allowNull: false})
    password:string;

    @Column({type: DataType.STRING, allowNull: false})
    firstName:string;

    @Column({type: DataType.STRING, allowNull: false})
    secondName:string;

    @Column({type: DataType.STRING, allowNull: false})
    lastName:string;
    
    @Column({type: DataType.STRING, allowNull: false})
    phone:string;

    @Column({type: DataType.STRING, allowNull: false})
    position:string;

    @BelongsToMany(()=>Role, ()=>UserRoles)
    roles: Role[];

}
