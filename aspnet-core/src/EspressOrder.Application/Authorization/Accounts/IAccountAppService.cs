using System.Threading.Tasks;
using Abp.Application.Services;
using EspressOrder.Authorization.Accounts.Dto;

namespace EspressOrder.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
