import { Role } from './Role';
import { Structure } from "./Structure";
import { AccreditatedUser } from "./AccreditatedUser";
import { ModuleUser } from "./ModuleUser";
import { Ptf } from './Ptf';

export class UserSystem {

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
  password: string;
  structureBeneficiaire: Structure;
  ptf: Ptf;
  accreditatedUsers: Array<AccreditatedUser>;
  moduleUsers: Array<ModuleUser>;
  accountStatus: boolean;
  firstLogin: boolean;

}
