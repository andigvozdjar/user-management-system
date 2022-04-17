import { Entity } from "src/app/base/models/base.models";
import { Permission } from "../permissions/permission.models";

export class User extends Entity {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  email?: string;
  status?: UserStatus = UserStatus.ACTIVE;
  permissions?: Permission[] = [];
  repeatPassword?: string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}