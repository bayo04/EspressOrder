using System.Threading.Tasks;
using Abp.Application.Services;
using EspressOrder.Sessions.Dto;

namespace EspressOrder.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
