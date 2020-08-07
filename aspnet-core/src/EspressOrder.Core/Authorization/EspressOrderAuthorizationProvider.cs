using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace EspressOrder.Authorization
{
    public class EspressOrderAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            context.CreatePermission(PermissionNames.Pages_Tables, L("Tables"));
            context.CreatePermission(PermissionNames.Pages_Categories, L("Categories"));
            context.CreatePermission(PermissionNames.Pages_MenuItems, L("MenuItems"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, EspressOrderConsts.LocalizationSourceName);
        }
    }
}
