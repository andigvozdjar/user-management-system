
import { Entity } from "src/app/base/models/base.models";

export class Permission extends Entity {
  code?: string;
  description?: string;
  permissionGroup?: string;
}

export class PermissionGroup {
  value?: string;
  children?: Permission[];
}