using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using EspressOrder.Configuration.Dto;

namespace EspressOrder.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : EspressOrderAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
