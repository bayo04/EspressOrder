import RoleStore from './roleStore';
import TenantStore from './tenantStore';
import UserStore from './userStore';
import SessionStore from './sessionStore';
import AuthenticationStore from './authenticationStore';
import AccountStore from './accountStore';
import TableStore from './tableStore';
import CategoryStore from './categoryStore';
import MenuItemStore from './menuItemStore';

export default function initializeStores() {
  return {
    authenticationStore: new AuthenticationStore(),
    roleStore: new RoleStore(),
    tenantStore: new TenantStore(),
    userStore: new UserStore(),
    sessionStore: new SessionStore(),
    accountStore: new AccountStore(),
    tableStore: new TableStore(),
    categoryStore: new CategoryStore(),
    menuItemStore: new MenuItemStore(),
  };
}
