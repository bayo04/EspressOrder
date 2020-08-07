using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace EspressOrder.Controllers
{
    public abstract class EspressOrderControllerBase: AbpController
    {
        protected EspressOrderControllerBase()
        {
            LocalizationSourceName = EspressOrderConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
