using Abp.Application.Services;
using EspressOrder.MultiTenancy.Dto;

namespace EspressOrder.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

