import { Pipe, PipeTransform } from '@angular/core';
import { RolesDictionaryEnum } from '../../../profile/models/roles.enum';
import { UserRolesEnum } from '../../models/role.enum';

@Pipe({
  name: 'parseRole',
})
export class RolePipe implements PipeTransform {
  transform(role: UserRolesEnum | undefined): string {
    if (!role) return '';
    return RolesDictionaryEnum[role];
  }
}
