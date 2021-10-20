import { Role } from './Role';
import { Structure } from './Structure';
import { AccreditatedUser } from './AccreditatedUser';
import { ModuleUser } from './ModuleUser';
import { Ptf } from './Ptf';

export class User {

  createBy: string;
  createdAt: string;
  deleteBy: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  tel: string;
  profession: string;
  roles: Array<Role>;
  status: boolean;
  updatedAt: string;
  username: string;
  structureBeneficiaire: Structure;
  ptf: Ptf;
  accreditatedUsers: Array<AccreditatedUser>;
  moduleUsers: Array<ModuleUser>;
  accountStatus: boolean;
  firstLogin: boolean;

  constructor(
    createBy: string, createdAt: string, deleteBy: string, email: string,
    firstName: string, id: number, lastName: string, tel: string, profession: string,
    roles: Array<Role>, status: boolean, updatedAt: string,
    username: string, structureBeneficiaire: Structure, ptf: Ptf,
    accreditatedUsers: Array<AccreditatedUser>,
    moduleUsers: Array<ModuleUser>, accountStatus: boolean
  ) {
    this.createBy = createBy;
    this.createdAt = createdAt;
    this.deleteBy = deleteBy;
    this.email = email;
    this.firstName = firstName;
    this.id = id;
    this.lastName = lastName;
    this.tel = tel;
    this.profession = profession;
    this.roles = roles;
    this.status = status;
    this.updatedAt = updatedAt;
    this.username = username;
    this.structureBeneficiaire = structureBeneficiaire;
    this.ptf = ptf;
    this.accreditatedUsers = accreditatedUsers;
    this.moduleUsers = moduleUsers;
    this.accountStatus = accountStatus;
  }

}
