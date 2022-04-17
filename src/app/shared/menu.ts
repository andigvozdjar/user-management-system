
import { Route } from './browserRoutes.config';
import { MenuItem } from './models/shared.models';

const users: MenuItem = {
  title: 'Users',
  matIcon: 'person',
  children: [
    {
      title: 'Create',
      link: `/${Route.USERS}/${Route.NEW}`,
      matIcon: 'add',
    },
    {
      title: 'List',
      matIcon: 'menu',
      link: `/${Route.USERS}`,
    }
  ]
};

export const MENU = [
  users
];
