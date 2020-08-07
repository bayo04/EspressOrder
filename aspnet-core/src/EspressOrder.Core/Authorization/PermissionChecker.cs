using Abp.Authorization;
using EspressOrder.Authorization.Roles;
using EspressOrder.Authorization.Users;

namespace EspressOrder.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
