using System.Threading.Tasks;
using EspressOrder.Configuration.Dto;

namespace EspressOrder.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
